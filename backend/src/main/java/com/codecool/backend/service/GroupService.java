package com.codecool.backend.service;

import com.codecool.backend.exception.group.*;
import com.codecool.backend.exception.student.StudentIsNotPartOfTheGroupException;
import com.codecool.backend.model.dto.request.GroupNameLevelTypesRecurringScheduleRequestDTO;
import com.codecool.backend.model.dto.request.group.*;
import com.codecool.backend.model.dto.response.RecurringScheduleDayStartEndTimeRequestDTO;
import com.codecool.backend.model.dto.response.group.GroupNameAndLevelResponseDTO;
import com.codecool.backend.model.dto.response.group.GroupNameLevelStudentsNumber;
import com.codecool.backend.model.dto.response.group.GroupRecurringSchedulesTime;
import com.codecool.backend.model.dto.response.student.StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO;
import com.codecool.backend.model.dto.response.teacher.TeacherPublicIdNameEmailNumberResponseDTO;
import com.codecool.backend.model.entity.*;
import com.codecool.backend.repository.GroupRepository;
import com.codecool.backend.repository.RecurringScheduleRepository;
import com.codecool.backend.repository.StudentRepository;
import com.codecool.backend.repository.TeacherRepository;
import com.codecool.backend.service.RetrieveStudentTeacherGroup.RetrieveStudentTeacherGroupService;
import com.codecool.backend.service.ageCalculator.AgeCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.Set;
import java.util.function.Consumer;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Service
public class GroupService {
    private final GroupRepository groupRepository;
    private final RetrieveStudentTeacherGroupService retrieveStudentTeacherGroupService;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final RecurringScheduleRepository recurringScheduleRepository;
    private final AgeCalculator ageCalculator;

    @Autowired
    public GroupService(GroupRepository groupRepository, TeacherRepository teacherRepository, StudentRepository studentRepository, RetrieveStudentTeacherGroupService retrieveStudentTeacherGroupService, TeacherRepository teacherRepository1, StudentRepository studentRepository1, RecurringScheduleRepository recurringScheduleRepository, AgeCalculator ageCalculator) {
        this.groupRepository = groupRepository;
        this.retrieveStudentTeacherGroupService = retrieveStudentTeacherGroupService;
        this.teacherRepository = teacherRepository1;
        this.studentRepository = studentRepository1;
        this.recurringScheduleRepository = recurringScheduleRepository;
        this.ageCalculator = ageCalculator;
    }


    public GroupNameLevelTypesRecurringScheduleRequestDTO getGroupByName(String groupName) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(groupName);

        return new GroupNameLevelTypesRecurringScheduleRequestDTO(
                foundGroup.getName(),
                foundGroup.getGroupTypes(),
                foundGroup.getGroupLevel(),
                foundGroup.getRecurringSchedules().stream()
                        .map(recurringSchedule -> new RecurringScheduleDayStartEndTimeRequestDTO(
                                recurringSchedule.getDayOfWeek().toString(),
                                recurringSchedule.getStartTime().toString(),
                                recurringSchedule.getEndTime().toString()))
                        .collect(Collectors.toList())
        );
    }

    public Set<GroupRecurringSchedulesTime> getRecurringSchedules(String groupName, LocalDate date) throws GroupNotFoundByNameException {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(groupName);
        return foundGroup.getRecurringSchedules().stream()
                .filter((recSchedule) ->  recSchedule.getDayOfWeek() == date.getDayOfWeek())
                .map((recurringSchedule) -> new GroupRecurringSchedulesTime(recurringSchedule.getStartTime(), recurringSchedule.getEndTime()))
                .collect(Collectors.toSet());
    }

    public Set<GroupNameLevelStudentsNumber> getAllGroupsNameLevelStudentsNumber() {
        return groupRepository.findAll().stream()
                .map(group ->
                        new GroupNameLevelStudentsNumber(group.getName(), group.getGroupLevel(), (long) group.getStudents()
                                .size()))
                .collect(Collectors.toSet());
    }

    public Set<StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO> getAllStudentsByGroup(String groupName) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(groupName);

        return foundGroup.getStudents().stream()
                .map(student -> {
                    int studentAge = ageCalculator.calculateAge(student.getBirthday(), LocalDate.now());
                    return new StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO(
                            student.getPublicId(),
                            student.getFirstName(),
                            student.getLastName(),
                            studentAge,
                            student.getParent().getEmail(),
                            student.getParent().getPhoneNumber());

                })
                .collect(Collectors.toSet());
    }

    public Set<TeacherPublicIdNameEmailNumberResponseDTO> getAllTeachersByGroup(String groupName) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(groupName);

        return foundGroup.getTeachers().stream()
                .map(teacher -> new TeacherPublicIdNameEmailNumberResponseDTO(teacher.getPublicId(), teacher.getFirstName(), teacher.getLastName(), teacher.getEmail(), teacher.getPhoneNumber()))
                .collect(Collectors.toSet());
    }

    public Set<GroupNameAndLevelResponseDTO> getAllGroupNamesAndLevel() {
        return groupRepository.findAll().stream()
                .map(danceGroup -> new GroupNameAndLevelResponseDTO(danceGroup.getName(), danceGroup.getGroupLevel()))
                .collect(Collectors.toSet());
    }

    public Set<GroupNameAndLevelResponseDTO> getAllOwnGroupNamesAndLevel(String teacherPublicId) {
        Teacher foundteacher = retrieveStudentTeacherGroupService.getTeacherByPublicId(teacherPublicId);
        return foundteacher.getGroups().stream()
                .map(group -> new GroupNameAndLevelResponseDTO(
                        group.getName(),
                        group.getGroupLevel())
                ).
                collect(Collectors.toSet());
    }

    public long createGroup(GroupNameTypeLevelRequestDTO group) {
        if (groupRepository.existsByName(group.groupName())) {
            throw new GroupAlreadyExistException("Group with the groupName " + group.groupName() + " already exists");
        }
        Group newGroup = new Group(group.groupName());
        newGroup.getGroupTypes().addAll(Arrays.stream(group.groupTypes()).toList());
        newGroup.setGroupLevel(group.groupLevel());

        Group savedGroup = groupRepository.save(newGroup);
        return savedGroup.getId();
    }

    @Transactional
    public long updateGroup(String groupName, GroupNameLevelTypesRecurringScheduleRequestDTO groupData) {

        Group groupForUpdate = retrieveStudentTeacherGroupService.getGroupByName(groupName);

        updateFieldIfNotNull(() -> groupData.groupName(), groupForUpdate::setName);
        updateFieldIfNotNull(() -> groupData.groupLevel(), groupForUpdate::setGroupLevel);
        updateFieldIfNotNull(() -> groupData.groupTypes(), groupForUpdate::setGroupTypes);

        for (RecurringScheduleDayStartEndTimeRequestDTO scheduleData : groupData.schedule()) {
            DayOfWeek dayOfWeek = DayOfWeek.valueOf(scheduleData.dayOfWeek().toUpperCase());

            LocalTime startTime = LocalTime.parse(scheduleData.startTime());
            LocalTime endTime = LocalTime.parse(scheduleData.endTime());

            RecurringSchedule newRecurringSchedule = new RecurringSchedule(dayOfWeek, startTime, endTime, groupForUpdate);
            recurringScheduleRepository.save(newRecurringSchedule);
            groupForUpdate.getRecurringSchedules().add(newRecurringSchedule);
        }

        groupRepository.save(groupForUpdate);

        return groupForUpdate.getId();
    }

    public long addStudentsToGroup(StudentsPublicIdGroupName studentsPublicIdGroupName) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(studentsPublicIdGroupName.groupName());

        Set<Student> students = studentsPublicIdGroupName.studentsPublicId().stream()
                .map(studentPublicId -> {
                    if (groupRepository.existsByNameAndStudentsPublicId(studentsPublicIdGroupName.groupName(), studentPublicId)) {
                        throw new StudentAlreadyPartOfGroupException("Student with the Id: " + studentPublicId + " is already part of the group");
                    }
                    return retrieveStudentTeacherGroupService.getStudentByPublicId(studentPublicId);
                })
                .collect(Collectors.toSet());

        foundGroup.getStudents().addAll(students);
        studentRepository.saveAll(students);
        groupRepository.save(foundGroup);
        return foundGroup.getId();
    }

    public long addTeachersToGroup(TeachersPublicIdsGroupNameDTO teachersPublicIdsGroupNameDTO) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(teachersPublicIdsGroupNameDTO.groupName());

        Set<Teacher> foundTeachers = teachersPublicIdsGroupNameDTO.teachersPublicIds().stream()
                .map(teacherPublicId -> {
                    if (groupRepository.existsByNameAndTeacherPublicId(foundGroup.getName(), teacherPublicId)) {
                        throw new TeacherAlreadyPartOfGroupException("Teacher with the publicId " + teacherPublicId + " is already part of the group");
                    }
                    return retrieveStudentTeacherGroupService.getTeacherByPublicId(teacherPublicId);
                }).collect(Collectors.toSet());

        foundGroup.getTeachers().addAll(foundTeachers);
        teacherRepository.saveAll(foundTeachers);
        groupRepository.save(foundGroup);
        return foundGroup.getId();
    }

    public long addGroupTypeToGroup(GroupNameGroupTypesRequestDTO groupNameTypesDto) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(groupNameTypesDto.groupName());

        Set<GroupType> groupTypes = groupNameTypesDto.groupTypes().stream()
                .peek(groupType -> {
                    if (groupRepository.existsByGroupTypesAndName(groupType, groupNameTypesDto.groupName())) {
                        throw new DanceTypeAlreadyPartOfTheGroup("Dance type " + groupType + " is already part of the group");
                    }
                }).collect(Collectors.toSet());

        foundGroup.getGroupTypes().addAll(groupTypes);
        groupRepository.save(foundGroup);

        return foundGroup.getId();
    }

    public boolean removeStudentFromGroup(String groupName, String studentPublicId) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(groupName);

        if (!groupRepository.existsByNameAndStudentsPublicId(groupName, studentPublicId)) {
            throw new StudentIsNotPartOfTheGroupException(
                    "Student with the public Id: " + studentPublicId + " is not part of the group"
            );
        }

        Student studentForDelete = retrieveStudentTeacherGroupService.getStudentByPublicId(studentPublicId);

        boolean isRemoved = foundGroup.getStudents().remove(studentForDelete);

        if (isRemoved) {
            groupRepository.save(foundGroup);
        }
        return isRemoved;
    }

    public boolean removeTeacherFromGroup(String groupName, String teacherPublicId) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(groupName);

        if (!groupRepository.existsByNameAndTeacherPublicId(groupName, teacherPublicId)) {
            throw new TeacherIsNotPartOfGroupException("Teacher with the public Id: " + teacherPublicId + " is not part of the group");
        }

        Teacher teacherForDelete = retrieveStudentTeacherGroupService.getTeacherByPublicId(teacherPublicId);
        boolean isRemoved = foundGroup.getTeachers().remove(teacherForDelete);

        if (isRemoved) {
            groupRepository.save(foundGroup);
        }

        return isRemoved;
    }

    public boolean removeGroupTypeFromGroup(GroupNameGroupTypesRequestDTO groupNameGroupTypesRequestDTO) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(groupNameGroupTypesRequestDTO.groupName());

        boolean isAnyDanceTypeRemoved = groupNameGroupTypesRequestDTO.groupTypes().stream()
                .anyMatch(danceType -> {
                    if (!groupRepository.existsByGroupTypesAndName(danceType, groupNameGroupTypesRequestDTO.groupName())) {
                        throw new GroupTypeIsNotPartOfGroupException("Dance type " + danceType + " is not part of the group");
                    }

                    return foundGroup.getGroupTypes().remove(danceType);

                });

        if (isAnyDanceTypeRemoved) {
            groupRepository.save(foundGroup);
        }
        return isAnyDanceTypeRemoved;
    }

    public boolean deleteDanceGroupByName(String name) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(name);
        return groupRepository.deleteByName(foundGroup.getName());
    }

    private <T> void updateFieldIfNotNull(Supplier<T> getter, Consumer<T> setter) {
        T value = getter.get();
        if (value != null) {
            setter.accept(value);
        }
    }

}

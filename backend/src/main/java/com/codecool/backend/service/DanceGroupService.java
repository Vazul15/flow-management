package com.codecool.backend.service;

import com.codecool.backend.exception.dancegroup.DanceGroupAlreadyExistException;
import com.codecool.backend.exception.dancegroup.DanceGroupNotFoundException;
import com.codecool.backend.exception.dancegroup.TeacherAlreadyPartOfTheDanceGroupException;
import com.codecool.backend.exception.student.StudentNotFoundException;
import com.codecool.backend.exception.teacher.TeacherNotFoundException;
import com.codecool.backend.exception.dancegroup.StudentAlreadyPartOfTheDanceGroupException;
import com.codecool.backend.model.dto.request.dancegroup.DanceGroupNameDanceTypesRequestDTO;
import com.codecool.backend.model.dto.request.dancegroup.DanceTypeAlreadyPartOfTheGroup;
import com.codecool.backend.model.dto.request.dancegroup.StudentsIdDanceGroupName;
import com.codecool.backend.model.dto.request.dancegroup.TeacherEmailDanceGroupNameDTO;
import com.codecool.backend.model.dto.response.student.StudentPreviewDTO;
import com.codecool.backend.model.entity.DanceGroup;
import com.codecool.backend.model.entity.DanceType;
import com.codecool.backend.model.entity.Student;
import com.codecool.backend.model.entity.Teacher;
import com.codecool.backend.repository.DanceGroupRepository;
import com.codecool.backend.repository.StudentRepository;
import com.codecool.backend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class DanceGroupService {
    private final DanceGroupRepository danceGroupRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public DanceGroupService(DanceGroupRepository danceGroupRepository, TeacherRepository teacherRepository, StudentRepository studentRepository) {
        this.danceGroupRepository = danceGroupRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
    }


    public Set<StudentPreviewDTO> getAllStudentsByDanceGroup(String danceGroupName) {
        DanceGroup foundDanceGroup = findDanceGroup(danceGroupName);

        return foundDanceGroup.getStudents().stream()
                .map(student -> new StudentPreviewDTO(student.getFirstName(), student.getLastName()))
                .collect(Collectors.toSet());
    }

    public long createDanceGroup(DanceGroupNameDanceTypesRequestDTO danceGroup) {
        if (danceGroupRepository.existsByName(danceGroup.danceGroupName())) {
            throw new DanceGroupAlreadyExistException("Dance group with the name " + danceGroup.danceGroupName() + " already exists");
        }
        DanceGroup newDanceGroup = new DanceGroup(danceGroup.danceGroupName());
        newDanceGroup.getDanceTypes().addAll(danceGroup.danceTypes());

        DanceGroup savedDanceGroup = danceGroupRepository.save(newDanceGroup);
        return savedDanceGroup.getId();
    }

    public long addStudentsToGroup(StudentsIdDanceGroupName studentsIdDanceGroupName) {
        DanceGroup foundDanceGroup = findDanceGroup(studentsIdDanceGroupName.danceGroupName());

        Set<Student> students = studentsIdDanceGroupName.studentsId().stream()
                .map(studentId -> {
                    if (danceGroupRepository.existsByNameAndStudentsId(studentsIdDanceGroupName.danceGroupName(), studentId)) {
                        throw new StudentAlreadyPartOfTheDanceGroupException("Student with the Id: " + studentId + " is already part of the group");
                    }
                    return studentRepository.findById(studentId)
                            .orElseThrow(() -> new StudentNotFoundException("Student with the following Id: " + studentId + " not found"));
                })
                .collect(Collectors.toSet());

        foundDanceGroup.getStudents().addAll(students);
        danceGroupRepository.save(foundDanceGroup);

        return foundDanceGroup.getId();
    }

    public long addTeacherToGroup(TeacherEmailDanceGroupNameDTO teacherEmailDanceGroupNameDTO) {
        DanceGroup foundDanceGroup = findDanceGroup(teacherEmailDanceGroupNameDTO.danceGroupName());

        Teacher foundTeacher = teacherRepository.findTeacherByEmail(teacherEmailDanceGroupNameDTO.teacherEmail())
                .orElseThrow(() -> new TeacherNotFoundException("Teacher with email " + teacherEmailDanceGroupNameDTO.teacherEmail() + " not found"));

        if (danceGroupRepository.existsByNameAndTeacherEmail(foundTeacher.getEmail(), foundDanceGroup.getName())) {
            throw new TeacherAlreadyPartOfTheDanceGroupException("Teacher with email: " + foundTeacher.getEmail() + " is already part of the dance grooup");
        }

        foundDanceGroup.getTeachers().add(foundTeacher);
        danceGroupRepository.save(foundDanceGroup);
        return foundDanceGroup.getId();
    }

    public long addDanceTypeToGroup(DanceGroupNameDanceTypesRequestDTO groupNameTypesDto) {
        DanceGroup foundDanceGroup = findDanceGroup(groupNameTypesDto.danceGroupName());

        Set<DanceType> danceTypes = groupNameTypesDto.danceTypes().stream()
                .map(danceType -> {
                    if (danceGroupRepository.existsByDanceTypesAndName(danceType, groupNameTypesDto.danceGroupName())) {
                        throw new DanceTypeAlreadyPartOfTheGroup("Dance type " + danceType + " is already part of the group");
                    }
                    return danceType;
                }).collect(Collectors.toSet());

        foundDanceGroup.getDanceTypes().addAll(groupNameTypesDto.danceTypes());
        danceGroupRepository.save(foundDanceGroup);

        return foundDanceGroup.getId();
    }

    private DanceGroup findDanceGroup(String danceGroupName) {
        DanceGroup foundDanceGroup = danceGroupRepository.findByName(danceGroupName)
                .orElseThrow(() -> new DanceGroupNotFoundException("Dance group with the danceGroupName " + danceGroupName + " not found"));

        return foundDanceGroup;
    }

}

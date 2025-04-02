package com.codecool.backend.service.attendance;

import com.codecool.backend.exception.attendance.ScheduleNotFoundByDateGroupStartEndTime;
import com.codecool.backend.exception.attendance.StudentAttendanceNotFound;
import com.codecool.backend.exception.group.GroupNotFoundByNameException;
import com.codecool.backend.exception.group.RecurringScheduleNotFoundInGroupException;
import com.codecool.backend.exception.student.StudentNotFoundException;
import com.codecool.backend.model.dto.request.studentAttendance.StudentAttendanceNewPresentRequestDTO;
import com.codecool.backend.model.dto.response.attendance.StudentAttendancePublicIdFirstNameLastNameIsPresentResponseDTO;
import com.codecool.backend.model.dto.response.attendance.StudentAttendancePublicIdIsPresent;
import com.codecool.backend.model.entity.*;
import com.codecool.backend.repository.*;
import com.codecool.backend.service.RetrieveStudentTeacherGroup.RetrieveStudentTeacherGroupService;
import com.codecool.backend.service.ScheduleService;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class StudentAttendanceService {
    private final StudentAttendanceRepository studentAttendanceRepository;
    private final ScheduleRepository scheduleRepository;
    private final StudentRepository studentRepository;
    private final GroupRepository groupRepository;
    private final RetrieveStudentTeacherGroupService retrieveStudentTeacherGroupService;
    private final ScheduleService scheduleService;

    public StudentAttendanceService(StudentAttendanceRepository studentAttendanceRepository, ScheduleRepository scheduleRepository, StudentRepository studentRepository, GroupRepository groupRepository, RetrieveStudentTeacherGroupService retrieveStudentTeacherGroupService, ScheduleService scheduleService) {
        this.studentAttendanceRepository = studentAttendanceRepository;
        this.scheduleRepository = scheduleRepository;
        this.studentRepository = studentRepository;
        this.groupRepository = groupRepository;
        this.retrieveStudentTeacherGroupService = retrieveStudentTeacherGroupService;
        this.scheduleService = scheduleService;
    }

    public List<StudentAttendancePublicIdFirstNameLastNameIsPresentResponseDTO> getAttendanceForStudents(String groupName,
                                                                                                         LocalDate date,
                                                                                                         LocalTime startTime,
                                                                                                         LocalTime endTime) throws RecurringScheduleNotFoundInGroupException, GroupNotFoundByNameException {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(groupName);
        Schedule schedule = scheduleService.findScheduleByGroupAndDateIfNotExsistCreateSchedule(foundGroup, date, startTime, endTime);

        boolean recurringScheduleExists = isRecurringScheduleForGroup(foundGroup, date.getDayOfWeek(), startTime, endTime);

        if (!recurringScheduleExists) {
            throw new RecurringScheduleNotFoundInGroupException("Recurring Schedule Not Found");
        }

        return foundGroup.getStudents().stream().map(student -> {
            StudentAttendance studentAttendance = getStudentAttendanceIfNotExistThenCreate(student, schedule);
            return new StudentAttendancePublicIdFirstNameLastNameIsPresentResponseDTO(student.getPublicId(), studentAttendance.getStudent().getFirstName(), studentAttendance.getStudent().getLastName(), studentAttendance.getPresent());
        }).toList();
    }

    public StudentAttendancePublicIdIsPresent markStudentAttendance(StudentAttendanceNewPresentRequestDTO studentAttendanceNewPresentRequestDTO) throws StudentNotFoundException, GroupNotFoundByNameException, ScheduleNotFoundByDateGroupStartEndTime {
        Student foundStudent = retrieveStudentTeacherGroupService.getStudentByPublicId(studentAttendanceNewPresentRequestDTO.studentPublicId());
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(studentAttendanceNewPresentRequestDTO.groupName());


        boolean recurringScheduleExists = isRecurringScheduleForGroup(foundGroup, studentAttendanceNewPresentRequestDTO.date().getDayOfWeek(), studentAttendanceNewPresentRequestDTO.startTime(), studentAttendanceNewPresentRequestDTO.endTime());

        if (!recurringScheduleExists) {
            throw new RecurringScheduleNotFoundInGroupException("Recurring Schedule Not Found");
        }

        Schedule existingSchedule = scheduleRepository.findByDateAndGroupAndStartTimeAndEndTime(studentAttendanceNewPresentRequestDTO.date(), foundGroup, studentAttendanceNewPresentRequestDTO.startTime(), studentAttendanceNewPresentRequestDTO.endTime())
                .orElseThrow(() -> new ScheduleNotFoundByDateGroupStartEndTime("Schedule Not Found"));

        StudentAttendance studentAttendance = existingSchedule.getStudentAttendances().stream()
                .filter(attendance -> attendance.getStudent().getPublicId().equals(foundStudent.getPublicId())).findFirst().orElseThrow(() -> new StudentAttendanceNotFound("Student Attendance Not Found"));

        studentAttendance.setPresent(studentAttendanceNewPresentRequestDTO.isPresent());
        studentAttendanceRepository.save(studentAttendance);
        return new StudentAttendancePublicIdIsPresent(studentAttendance.getStudent().getPublicId(), studentAttendance.getPresent());
    }

    private boolean isRecurringScheduleForGroup(Group group, DayOfWeek dayOfWeek, LocalTime startTime, LocalTime endTime) {
        return group.getRecurringSchedules().stream()
                .anyMatch(recurringSchedule -> recurringSchedule.getDayOfWeek() == dayOfWeek &&
                        recurringSchedule.getStartTime().equals(startTime) &&
                        recurringSchedule.getEndTime().equals(endTime));
    }

    private StudentAttendance getStudentAttendanceIfNotExistThenCreate(Student student, Schedule schedule) {
        return studentAttendanceRepository.findByStudentAndSchedule(student, schedule).orElseGet(() ->
        {
            StudentAttendance studentAttendance = new StudentAttendance(schedule, AttendanceState.PENDING, student);
            studentAttendanceRepository.save(studentAttendance);
            return studentAttendance;
        });
    }
}



package com.codecool.backend.service.statistics;

import com.codecool.backend.model.dto.request.group.StudentPublicIdsGroupName;
import com.codecool.backend.model.dto.response.attendance.StudentPublicIdPresentPercentageAbsentPercentage;
import com.codecool.backend.model.entity.AttendanceState;
import com.codecool.backend.model.entity.Student;
import com.codecool.backend.repository.ScheduleRepository;
import com.codecool.backend.repository.StudentAttendanceRepository;
import com.codecool.backend.service.RetrieveStudentTeacherGroup.RetrieveStudentTeacherGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class StudentStatisticsCalculatorService {
    StudentAttendanceRepository studentAttendanceRepository;
    RetrieveStudentTeacherGroupService retrieveStudentTeacherGroupService;
    ScheduleRepository ScheduleRepository;

    @Autowired
    public StudentStatisticsCalculatorService(StudentAttendanceRepository studentAttendanceRepository, RetrieveStudentTeacherGroupService retrieveStudentTeacherGroupService, ScheduleRepository scheduleRepository) {
        this.studentAttendanceRepository = studentAttendanceRepository;
        this.retrieveStudentTeacherGroupService = retrieveStudentTeacherGroupService;
        this.ScheduleRepository = scheduleRepository;
    }

    public List<StudentPublicIdPresentPercentageAbsentPercentage> getStudentAttendanceStatistics(String groupName) {
        List<Student> foundStudents = retrieveStudentTeacherGroupService.getGroupByName(groupName).getStudents();

        return foundStudents.stream()
                .map(student -> {
                    Map<AttendanceState, Long> attendanceCounts = student.getStudentAttendances().stream()
                            .filter(attendance ->
                                    attendance.getSchedule() != null &&
                                            attendance.getSchedule().getGroup() != null &&
                                            attendance.getSchedule().getGroup().getName().equals(groupName) &&
                                            (attendance.getPresent() == AttendanceState.PRESENT || attendance.getPresent() == AttendanceState.ABSENT))
                            .collect(Collectors.groupingBy(attendance -> attendance.getPresent(), Collectors.counting()));

                    long presentCount = attendanceCounts.getOrDefault(AttendanceState.PRESENT, 0L);
                    long absentCount = attendanceCounts.getOrDefault(AttendanceState.ABSENT, 0L);
                    long totalCount = presentCount + absentCount;

                    double presentPercentage = totalCount > 0
                            ? Math.round((presentCount * 100.0 / totalCount) * 100.0) / 100.0
                            : 0.0;
                    double absentPercentage = totalCount > 0
                            ? Math.round((absentCount * 100.0 / totalCount) * 100.0) / 100.0
                            : 0.0;

                    return new StudentPublicIdPresentPercentageAbsentPercentage(
                            student.getPublicId(),student.getFirstName(), student.getLastName(), presentPercentage, absentPercentage);
                })
                .collect(Collectors.toList());
    }
}

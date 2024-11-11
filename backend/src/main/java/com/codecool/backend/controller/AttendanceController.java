package com.codecool.backend.controller;

import com.codecool.backend.model.dto.request.attendance.AttendanceLocalDateDanceGroupNameRequestDTO;
import com.codecool.backend.model.dto.response.attendance.AttendanceStudentResponseDTO;
import com.codecool.backend.model.dto.response.attendance.AttendanceTeacherResponseDTO;
import com.codecool.backend.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {
    private final AttendanceService attendanceService;

    @Autowired
    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping(path="/students")
    public List<AttendanceStudentResponseDTO> getStudentsAttendanceByDate(@RequestBody AttendanceLocalDateDanceGroupNameRequestDTO studentsAttendance) {
        return attendanceService.getAttendanceForStudentsByGroupAndDate(studentsAttendance);
    }

    @GetMapping(path="/teacher")
    public List<AttendanceTeacherResponseDTO> getTeachersAttendanceByDate(@RequestBody AttendanceLocalDateDanceGroupNameRequestDTO teacherAttendance) {
        return attendanceService.getAttendanceForTeachersByGroupAndDate(teacherAttendance);
    }
}

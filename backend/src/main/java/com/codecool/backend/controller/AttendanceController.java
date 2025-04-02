package com.codecool.backend.controller;

import com.codecool.backend.model.dto.request.studentAttendance.StudentAttendanceNewPresentRequestDTO;
import com.codecool.backend.model.dto.response.attendance.StudentAttendancePublicIdFirstNameLastNameIsPresentResponseDTO;
import com.codecool.backend.model.dto.response.attendance.StudentAttendancePublicIdIsPresent;
import com.codecool.backend.service.attendance.StudentAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {
    private final StudentAttendanceService studentAttendanceService;

    @Autowired
    public AttendanceController(StudentAttendanceService studentAttendanceService) {
        this.studentAttendanceService = studentAttendanceService;
    }

    @GetMapping(path = "")
    public List<StudentAttendancePublicIdFirstNameLastNameIsPresentResponseDTO> getAttendanceStudents(@RequestParam String groupName,
                                                                                                      @RequestParam String date,
                                                                                                      @RequestParam String startTime,
                                                                                                      @RequestParam String endTime) {
        LocalDate parsedDate = LocalDate.parse(date);
        LocalTime parsedStartTime = LocalTime.parse(startTime);
        LocalTime parsedEndTime = LocalTime.parse(endTime);

        return studentAttendanceService.getAttendanceForStudents(groupName, parsedDate, parsedStartTime, parsedEndTime);
    }

    @PutMapping(path = "")
    public StudentAttendancePublicIdIsPresent markStudentAttendance(@RequestBody StudentAttendanceNewPresentRequestDTO studentAttendance) {
        return studentAttendanceService.markStudentAttendance(studentAttendance);
    }
}

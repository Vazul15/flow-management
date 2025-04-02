package com.codecool.backend.controller;

import com.codecool.backend.model.dto.request.group.StudentPublicIdsGroupName;
import com.codecool.backend.model.dto.response.attendance.StudentPublicIdPresentPercentageAbsentPercentage;
import com.codecool.backend.service.statistics.StudentStatisticsCalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {
    StudentStatisticsCalculatorService studentStatisticsCalculatorService;

    @Autowired
    public StatisticsController(StudentStatisticsCalculatorService studentStatisticsCalculatorService) {
        this.studentStatisticsCalculatorService = studentStatisticsCalculatorService;
    }

    @GetMapping(path="/students/{groupName}")
    public List<StudentPublicIdPresentPercentageAbsentPercentage> getStudentsStatistics(@PathVariable String groupName) {
       return studentStatisticsCalculatorService.getStudentAttendanceStatistics(groupName);
    }
}

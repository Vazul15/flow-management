package com.codecool.backend.controller;

import com.codecool.backend.model.dto.request.dancegroup.DanceGroupNameDanceTypesRequestDTO;
import com.codecool.backend.model.dto.request.dancegroup.StudentsIdDanceGroupName;
import com.codecool.backend.model.dto.response.student.StudentPreviewDTO;
import com.codecool.backend.service.DanceGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/dancegroup")
public class DanceGroupController {
    private final DanceGroupService danceGroupService;

    @Autowired
    public DanceGroupController(DanceGroupService danceGroupService) {
        this.danceGroupService = danceGroupService;
    }

    @GetMapping(path="/students")
    public Set<StudentPreviewDTO> getStudents(@RequestParam String name) {
        return danceGroupService.getAllStudentsByDanceGroup(name);
    }

    @PostMapping(path = "")
    public long createDanceGroup(@RequestBody DanceGroupNameDanceTypesRequestDTO requestDTO) {
        return danceGroupService.createDanceGroup(requestDTO);
    }

    @PutMapping(path="/students")
    public long addStudentstoDanceGroup(@RequestBody StudentsIdDanceGroupName requestDTO) {
        return danceGroupService.addStudentsToGroup(requestDTO);
    }
}

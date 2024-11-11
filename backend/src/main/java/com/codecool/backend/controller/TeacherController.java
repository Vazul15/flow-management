package com.codecool.backend.controller;

import com.codecool.backend.model.dto.request.teacher.TeacherEmailDTO;
import com.codecool.backend.model.dto.response.teacher.TeacherEmailandPasswordDTO;
import com.codecool.backend.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/teacher")
public class TeacherController {
private final TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @PostMapping(path = "/create")
    public TeacherEmailandPasswordDTO registerTeacher(@RequestBody TeacherEmailDTO teacherEmailDTO) {
        return teacherService.saveTeacher(teacherEmailDTO);
    }


}

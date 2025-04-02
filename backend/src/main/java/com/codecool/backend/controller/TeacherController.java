package com.codecool.backend.controller;

import com.codecool.backend.model.dto.request.teacher.TeacherPublicIdNameEmailNumberRequestDTO;
import com.codecool.backend.model.dto.response.student.StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO;
import com.codecool.backend.model.dto.response.teacher.TeacherNameEmailResponseDTO;
import com.codecool.backend.model.dto.response.teacher.TeacherPublicIdNameEmailNumberResponseDTO;
import com.codecool.backend.model.dto.response.teacher.TeacherEmailandPasswordResponseDTO;
import com.codecool.backend.model.payload.JwtResponse;
import com.codecool.backend.model.payload.LoginRequest;
import com.codecool.backend.model.payload.RegisterRequest;
import com.codecool.backend.service.AuthService;
import com.codecool.backend.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping(path = "/api/teacher")
public class TeacherController {
private final TeacherService teacherService;
    private final AuthService authService;

    @Autowired
    public TeacherController(TeacherService teacherService, AuthService authService) {
        this.teacherService = teacherService;
        this.authService = authService;
    }

    @PostMapping(path = "/register")
    public TeacherEmailandPasswordResponseDTO registerTeacher(@RequestBody RegisterRequest registerRequest) {
        return teacherService.saveTeacher(registerRequest);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> authenticateTeacher(@RequestBody LoginRequest request) {
        JwtResponse jwtResponse = authService.authenticateUser(request);
        return ResponseEntity.ok(jwtResponse);
    }

    @GetMapping(path="/all/except-group")
    public Set<TeacherPublicIdNameEmailNumberResponseDTO> getAllTeachersExceptGroup(@RequestParam String name) {
        return teacherService.getAllTeachersExceptGroup(name);
    }

    @GetMapping(path="/students")
    public Set<StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO> getAllStudentsByTeacher(@RequestParam String publicId) {
        return teacherService.getAllStudentsByTeacher(publicId);
    }

    @GetMapping(path= "")
    public TeacherNameEmailResponseDTO getTeacherNameAndEmail(@RequestParam String publicId) {
        return teacherService.getTeacherNameAndEmail(publicId);
    }

    @PutMapping(path = "")
    public void updateTeacher(@RequestBody TeacherPublicIdNameEmailNumberRequestDTO teacherDto) {
        teacherService.updateTeacher(teacherDto);
    }

}

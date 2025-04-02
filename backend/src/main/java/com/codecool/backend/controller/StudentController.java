package com.codecool.backend.controller;

import com.codecool.backend.model.dto.request.student.NewStudentRequestDTO;
import com.codecool.backend.model.dto.response.student.StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO;
import com.codecool.backend.model.dto.response.student.StudentPublicIdFirstLastNameAgeResponseDTO;
import com.codecool.backend.model.dto.response.student.StudentPublicIdFirstNameLastNameResponseDTO;
import com.codecool.backend.model.dto.response.student.StudentPublicIdResponseDTO;
import com.codecool.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/student")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping(path = "")
    public StudentPublicIdResponseDTO saveStudent(@RequestBody NewStudentRequestDTO studentDto) {
        return studentService.saveStudent(studentDto);
    }

    @GetMapping(path = "")
    public StudentPublicIdFirstNameLastNameResponseDTO getStudentById(@RequestParam String studentId) {
        return studentService.getStudentByPublicId(studentId);
    }

    @GetMapping(path="/all")
    public Set<StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/all/except-group")
    public Set<StudentPublicIdFirstLastNameAgeResponseDTO> getAllStudentsExceptGroup(@RequestParam String name) {
        return studentService.getAllStudentsExceptGroup(name);
    }

    @PutMapping(path="")
    public void updateStudent(@RequestParam long studentId, @RequestBody NewStudentRequestDTO studentDto) {
    }

    @DeleteMapping(path="/{studentPublicId}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String studentPublicId) {
        studentService.deleteStudent(studentPublicId);
        return ResponseEntity.noContent().build();
    }
}

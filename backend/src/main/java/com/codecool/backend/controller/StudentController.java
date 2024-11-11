package com.codecool.backend.controller;

import com.codecool.backend.model.dto.request.student.NewStudentRequestDTO;
import com.codecool.backend.model.dto.response.student.StudentPreviewDTO;
import com.codecool.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping(path = "")
    public StudentPreviewDTO getStudentById(@RequestParam long studentId) {
        return studentService.getStudentById(studentId);
    }

    @GetMapping(path="/all")
    public Set<StudentPreviewDTO> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping(path = "")
    public void saveStudent(@RequestBody NewStudentRequestDTO studentDto) {
        studentService.saveStudent(studentDto);
    }

    @DeleteMapping(path="")
    public void deleteStudent(@RequestParam long studentId) {
        studentService.deleteStudent(studentId);
    }

    @PutMapping(path="")
    public void updateStudent(@RequestParam long studentId, @RequestBody NewStudentRequestDTO studentDto) {

    }
}

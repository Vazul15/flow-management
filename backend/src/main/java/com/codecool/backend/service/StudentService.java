package com.codecool.backend.service;

import com.codecool.backend.exception.student.StudentNotFoundException;
import com.codecool.backend.model.dto.request.student.NewStudentRequestDTO;
import com.codecool.backend.model.dto.response.student.StudentPreviewDTO;
import com.codecool.backend.model.entity.Student;
import com.codecool.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public long saveStudent(NewStudentRequestDTO studentDto) {
        Student student = new Student(studentDto.firstName(), studentDto.lastName(), studentDto.birthDate(), studentDto.gender());
        studentRepository.save(student);
        return student.getId();
    }

    public void deleteStudent(long studentId) {
        Student student = retrieveStudentById(studentId);
        studentRepository.deleteById(student.getId());
    }

    public StudentPreviewDTO getStudentById(long studentId) {
        Student student = retrieveStudentById(studentId);
        return new StudentPreviewDTO(student.getFirstName(), student.getLastName());
    }

    public Set<StudentPreviewDTO> getAllStudents() {
        return studentRepository.findAllByOrderByFirstNameAsc().stream()
                .map(student -> new StudentPreviewDTO(student.getFirstName(), student.getLastName())).collect(Collectors.toSet());
    }

    private Student retrieveStudentById(long studentId) {
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student with the Id: " + studentId + " not found"));
    }
}

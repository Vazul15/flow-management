package com.codecool.backend.service;

import com.codecool.backend.exception.parent.ParentNotFoundByEmailException;
import com.codecool.backend.model.dto.request.student.NewStudentRequestDTO;
import com.codecool.backend.model.dto.response.student.StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO;
import com.codecool.backend.model.dto.response.student.StudentPublicIdFirstLastNameAgeResponseDTO;
import com.codecool.backend.model.dto.response.student.StudentPublicIdFirstNameLastNameResponseDTO;
import com.codecool.backend.model.dto.response.student.StudentPublicIdResponseDTO;
import com.codecool.backend.model.entity.Group;
import com.codecool.backend.model.entity.Parent;
import com.codecool.backend.model.entity.Student;
import com.codecool.backend.repository.GroupRepository;
import com.codecool.backend.repository.ParentRepository;
import com.codecool.backend.repository.StudentRepository;
import com.codecool.backend.service.RetrieveStudentTeacherGroup.RetrieveStudentTeacherGroupService;
import com.codecool.backend.service.ageCalculator.AgeCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final ParentRepository parentRepository;
    private final AgeCalculator ageCalculator;
    private final RetrieveStudentTeacherGroupService retrieveStudentTeacherGroupService;

    @Autowired
    public StudentService(StudentRepository studentRepository, ParentRepository parentRepository, GroupRepository groupRepository, RetrieveStudentTeacherGroupService retrieveStudentTeacherGroupService) {
        this.studentRepository = studentRepository;
        this.parentRepository = parentRepository;
        this.retrieveStudentTeacherGroupService = retrieveStudentTeacherGroupService;
        this.ageCalculator = new AgeCalculator();
    }

    public StudentPublicIdFirstNameLastNameResponseDTO getStudentByPublicId(String studentId) {
        Student student = retrieveStudentTeacherGroupService.getStudentByPublicId(studentId);
        return new StudentPublicIdFirstNameLastNameResponseDTO(student.getPublicId(), student.getFirstName(), student.getLastName());
    }

    public Set<StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO> getAllStudents() {
        return studentRepository.findAllByOrderByFirstNameAsc().stream()
                .map(student -> {
                    int studentAge = ageCalculator.calculateAge(student.getBirthday(), LocalDate.now());
                    return new StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO(
                            student.getPublicId(),
                            student.getFirstName(),
                            student.getLastName(),
                            studentAge,
                            student.getParent().getEmail(),
                            student.getParent().getPhoneNumber()
                    );
                }).collect(Collectors.toSet());
    }

    public Set<StudentPublicIdFirstLastNameAgeResponseDTO> getAllStudentsExceptGroup(String groupName) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(groupName);

        return studentRepository.findAllByGroupsNotContaining(foundGroup).stream()
                .map(student -> {
                    int studentAge = ageCalculator.calculateAge(student.getBirthday(), LocalDate.now());
                    return new StudentPublicIdFirstLastNameAgeResponseDTO(student.getPublicId(), student.getFirstName(), student.getLastName(), studentAge);
                })
                .collect(Collectors.toSet());
    }

    public StudentPublicIdResponseDTO saveStudent(NewStudentRequestDTO studentDto) {
        Parent parent;
        try {
            parent = retrieveParentByEmail(studentDto.parentEmail());
        } catch (ParentNotFoundByEmailException e) {
            parent = new Parent(studentDto.parentEmail(), studentDto.parentPhoneNumber());
            parent = parentRepository.save(parent);
        }

        Student student = new Student(studentDto.firstName(), studentDto.lastName(), studentDto.birthDate(), studentDto.gender());
        student.setParent(parent);
        parent.getStudents().add(student);

        parentRepository.save(parent);
        studentRepository.save(student);
        return new StudentPublicIdResponseDTO(student.getPublicId());
    }

    public void deleteStudent(String studentPublicId) {
        Student student = retrieveStudentTeacherGroupService.getStudentByPublicId(studentPublicId);
        studentRepository.deleteById(student.getId());
    }

    private Parent retrieveParentByEmail(String parentEmail) {
        return parentRepository.findByEmail(parentEmail)
                .orElseThrow(() -> new ParentNotFoundByEmailException("Parent with the Email: " + parentEmail + " not found"));
    }
}

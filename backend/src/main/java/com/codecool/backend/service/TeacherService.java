package com.codecool.backend.service;

import com.codecool.backend.exception.teacher.TeacherEmailAlreadyExistException;
import com.codecool.backend.model.dto.request.teacher.TeacherPublicIdNameEmailNumberRequestDTO;
import com.codecool.backend.model.dto.response.student.StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO;
import com.codecool.backend.model.dto.response.teacher.TeacherNameEmailResponseDTO;
import com.codecool.backend.model.dto.response.teacher.TeacherPublicIdNameEmailNumberResponseDTO;
import com.codecool.backend.model.dto.response.teacher.TeacherEmailandPasswordResponseDTO;
import com.codecool.backend.model.entity.Group;
import com.codecool.backend.model.entity.Teacher;
import com.codecool.backend.model.entity.Role;
import com.codecool.backend.model.entity.RoleType;
import com.codecool.backend.model.payload.RegisterRequest;
import com.codecool.backend.repository.GroupRepository;
import com.codecool.backend.repository.TeacherRepository;
import com.codecool.backend.repository.RoleRepository;
import com.codecool.backend.security.jwt.JwtUtils;
import com.codecool.backend.service.RetrieveStudentTeacherGroup.RetrieveStudentTeacherGroupService;
import com.codecool.backend.service.ageCalculator.AgeCalculator;
import com.codecool.backend.service.emailSender.SendEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;
    private final RetrieveStudentTeacherGroupService retrieveStudentTeacherGroupService;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final SendEmailService sendEmailService;
    private final AgeCalculator ageCalculator;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository, GroupRepository groupRepository, RetrieveStudentTeacherGroupService retrieveStudentTeacherGroupService, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtUtils jwtUtils, SendEmailService sendEmailService, AgeCalculator ageCalculator) {
        this.teacherRepository = teacherRepository;
        this.retrieveStudentTeacherGroupService = retrieveStudentTeacherGroupService;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.sendEmailService = sendEmailService;
        this.ageCalculator = ageCalculator;
    }

    public TeacherEmailandPasswordResponseDTO saveTeacher(RegisterRequest teacher) {
        if (teacherRepository.existsTeacherByEmail(teacher.getEmail())) {
            throw new TeacherEmailAlreadyExistException("Email already exist");
        }

        String generatedPassword = generateRandomPassword(8);
        String encodedPassword = passwordEncoder.encode(generatedPassword);

        Teacher teacherEntity = new Teacher(teacher.getEmail(), teacher.getFirstName(), encodedPassword);
        Optional<Role> defaultRoleType = roleRepository.findByRoleType(RoleType.ROLE_TEACHER);

        defaultRoleType.ifPresentOrElse(
                role -> teacherEntity.getRoles().add(role),
                () -> {
                    Role newRole = new Role(RoleType.ROLE_TEACHER);
                    Role savedRole = roleRepository.save(newRole);
                    teacherEntity.getRoles().add(savedRole);
                }
        );
        teacherRepository.save(teacherEntity);

        String emailBody = String.format("Dear %s,\n\nThe generated password for your account is: %s \n\nKind regards, \n\nSchool Management Team",
                teacher.getFirstName(), generatedPassword);

        String emailSubject = "School Management app password";

        sendEmailService.sendEmail(teacher.getEmail(), emailSubject, emailBody);

        return new TeacherEmailandPasswordResponseDTO(teacherEntity.getEmail(), teacherEntity.getPassword());
    }

    public TeacherNameEmailResponseDTO getTeacherNameAndEmail(String publicId) {
        Teacher foundTeacher = retrieveStudentTeacherGroupService.getTeacherByPublicId(publicId);
        return new TeacherNameEmailResponseDTO(foundTeacher.getFirstName(), foundTeacher.getEmail());
    }

    public Set<TeacherPublicIdNameEmailNumberResponseDTO> getAllTeachersExceptGroup(String groupName) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(groupName);

        return teacherRepository.findAllByGroupsNotContaining(foundGroup).stream()
                .map(teacher -> new TeacherPublicIdNameEmailNumberResponseDTO(
                        teacher.getPublicId(),
                        teacher.getFirstName(),
                        teacher.getLastName(),
                        teacher.getEmail(),
                        teacher.getPhoneNumber()
                ))
                .collect(Collectors.toSet());
    }

    public Set<StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO> getAllStudentsByTeacher(String publicId) {
        Teacher foundTeacher = retrieveStudentTeacherGroupService.getTeacherByPublicId(publicId);

        return foundTeacher.getGroups().stream()
                .flatMap(group -> group.getStudents().stream()
                        .map(student -> {
                            int studentAge = ageCalculator.calculateAge(student.getBirthday(), LocalDate.now());
                            return new StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO(
                                    student.getPublicId(), student.getFirstName(), student.getLastName(), studentAge, student.getParent().getEmail(), student.getParent().getPhoneNumber()
                            );
                        }))
                .collect(Collectors.toSet());
    }

    public void updateTeacher(TeacherPublicIdNameEmailNumberRequestDTO teacherDto) {
        Teacher teacherForUpdate = retrieveStudentTeacherGroupService.getTeacherByPublicId(teacherDto.publicId());
        teacherForUpdate.setFirstName(teacherDto.firstName());
        teacherForUpdate.setLastName(teacherDto.lastName());
        teacherForUpdate.setPhoneNumber(teacherDto.phoneNumber());
        teacherForUpdate.setEmail(teacherDto.email());
        teacherRepository.save(teacherForUpdate);
    }

    private String generateRandomPassword(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            password.append(characters.charAt(index));
        }

        return password.toString();
    }
}

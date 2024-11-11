package com.codecool.backend.service;

import com.codecool.backend.exception.teacher.TeacherEmailAlreadyExistException;
import com.codecool.backend.model.dto.request.teacher.TeacherEmailDTO;
import com.codecool.backend.model.dto.response.teacher.TeacherEmailandPasswordDTO;
import com.codecool.backend.model.entity.Teacher;
import com.codecool.backend.model.entity.Role;
import com.codecool.backend.model.entity.RoleType;
import com.codecool.backend.repository.TeacherRepository;
import com.codecool.backend.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository, RoleRepository roleRepository) {
        this.teacherRepository = teacherRepository;
        this.roleRepository = roleRepository;
    }

    public TeacherEmailandPasswordDTO saveTeacher(TeacherEmailDTO teacher) {
    if (teacherRepository.existsTeacherByEmail(teacher.email())) {
        throw new TeacherEmailAlreadyExistException("Email already exist");
    }

        String generatedPassword = generateRandomPassword(8);

        Teacher teacherEntity = new Teacher(teacher.email(), generatedPassword);
        Optional<Role> defaultRoleType = roleRepository.findByRoleType(RoleType.TEACHER);

        defaultRoleType.ifPresentOrElse(
                role-> teacherEntity.getRoles().add(role),
                () -> {
                    Role newRole = new Role(RoleType.TEACHER);
                    Role savedRole = roleRepository.save(newRole);
                    teacherEntity.getRoles().add(savedRole);
                }
                );
        teacherRepository.save(teacherEntity);
        return new TeacherEmailandPasswordDTO(teacherEntity.getEmail(), teacherEntity.getPassword());
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

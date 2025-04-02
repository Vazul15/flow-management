package com.codecool.backend.service.adminUserInitializer;

import com.codecool.backend.model.entity.Role;
import com.codecool.backend.model.entity.RoleType;
import com.codecool.backend.model.entity.Teacher;
import com.codecool.backend.repository.RoleRepository;
import com.codecool.backend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminUserInitializer implements CommandLineRunner {

    private final TeacherRepository teacherRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminUserInitializer(TeacherRepository teacherRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.teacherRepository = teacherRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!teacherRepository.existsTeacherByEmail("admin@admin.com")) {

            String encodedPassword = passwordEncoder.encode("admin123");
            Role adminRole = roleRepository.findByRoleType(RoleType.ROLE_ADMIN)
                    .orElseGet(() -> roleRepository.save(new Role(RoleType.ROLE_ADMIN)));

            Teacher admin = new Teacher();
            admin.setEmail("admin@admin.com");
            admin.setPassword(encodedPassword);
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.getRoles().add(adminRole);
            teacherRepository.save(admin);

            System.out.println("Admin user created with email: admin@admin.com");
        }
    }
}
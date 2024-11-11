package com.codecool.backend.repository;

import com.codecool.backend.model.entity.Teacher;
import com.codecool.backend.model.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    boolean existsTeacherByEmail(String email);
    List<Teacher> findTeachersByFirstName(String name);
    List<Teacher> findByRoles(Role role);
    Optional<Teacher> findTeacherByEmail(String email);
}

package com.codecool.backend.repository;

import com.codecool.backend.model.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findById(long id);
    Set<Student> findAllByOrderByFirstNameAsc();
}

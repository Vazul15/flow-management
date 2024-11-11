package com.codecool.backend.repository;

import com.codecool.backend.model.entity.Attendance;
import com.codecool.backend.model.entity.Student;
import com.codecool.backend.model.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    Optional<Attendance> findByStudentAndDate(Student student, LocalDate date);
    Optional<Attendance> findByTeacherAndDate(Teacher teacher, LocalDate date);
}

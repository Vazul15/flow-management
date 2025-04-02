package com.codecool.backend.repository;

import com.codecool.backend.model.entity.*;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentAttendanceRepository extends JpaRepository<StudentAttendance, Long> {
    List<StudentAttendance> findBySchedule(Schedule schedule);

    Optional<StudentAttendance> findByStudentAndSchedule(
            Student student,
            Schedule schedule
    );
}

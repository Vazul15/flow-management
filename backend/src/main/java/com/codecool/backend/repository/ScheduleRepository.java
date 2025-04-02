package com.codecool.backend.repository;

import com.codecool.backend.model.entity.Group;
import com.codecool.backend.model.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    Optional<Schedule> findByDateAndGroupAndStartTimeAndEndTime(
            LocalDate date, Group group, LocalTime startTime, LocalTime endTime);

}

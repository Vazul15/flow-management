package com.codecool.backend.repository;

import com.codecool.backend.model.entity.RecurringSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecurringScheduleRepository extends JpaRepository<RecurringSchedule, Long> {
}

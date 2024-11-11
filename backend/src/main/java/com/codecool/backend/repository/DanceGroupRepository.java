package com.codecool.backend.repository;
import com.codecool.backend.model.entity.DanceGroup;
import com.codecool.backend.model.entity.DanceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DanceGroupRepository extends JpaRepository<DanceGroup, Long> {
    Optional<DanceGroup> findByName(String name);
    boolean existsByName(String name);
    boolean existsByNameAndStudentsId(String name, Long studentId);
    boolean existsByStudentsId(Long studentId);
    boolean existsByNameAndTeacherEmail(String name, String teacherEmail);
    boolean existsByDanceTypesAndName(DanceType danceType, String name);
}

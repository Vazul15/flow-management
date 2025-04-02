package com.codecool.backend.repository;
import com.codecool.backend.model.entity.Group;
import com.codecool.backend.model.entity.GroupType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    Optional<Group> findByName(String name);
    boolean existsByName(String name);
    @Query("SELECT CASE WHEN COUNT(d) > 0 THEN TRUE ELSE FALSE END FROM Group d JOIN d.students s WHERE d.name = :name AND s.publicId = :studentId")
    boolean existsByNameAndStudentsPublicId(String name, String studentId);
    @Query("SELECT CASE WHEN COUNT(d) > 0 THEN TRUE ELSE FALSE END FROM Group d JOIN d.teachers t WHERE d.name = :groupName AND t.publicId = :teacherId")
    boolean existsByNameAndTeacherPublicId(String groupName, String teacherId);
    boolean existsByGroupTypesAndName(GroupType groupType, String name);
    boolean deleteByName(String name);
}

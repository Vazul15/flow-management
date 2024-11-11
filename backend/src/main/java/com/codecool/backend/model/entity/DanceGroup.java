package com.codecool.backend.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DanceGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    @ElementCollection
    @CollectionTable(name = "dance_group_dance_types", joinColumns = @JoinColumn(name = "dance_group_id"))
    private Set<DanceType> danceTypes = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "dance_group_teachers",
            joinColumns = @JoinColumn(name = "dance_group_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id")
    )
    private final Set<Teacher> teachers = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "dance_group_students",
            joinColumns = @JoinColumn(name = "dance_group_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private final Set<Student> students = new HashSet<>();

    @OneToMany(mappedBy = "danceGroup", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Attendance> attendanceRecords = new HashSet<>();

    public DanceGroup(String name) {
        this.name = name;
    }
}

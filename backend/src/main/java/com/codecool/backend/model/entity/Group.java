package com.codecool.backend.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "\"group\"")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String name;

    @Enumerated(EnumType.STRING)
    @ElementCollection
    @CollectionTable(name = "group_group_types", joinColumns = @JoinColumn(name = "group_id"))
    private Set<GroupType> groupTypes = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private GroupLevel groupLevel;
    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "group_teachers",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "teacher_id")
    )
    private List<Teacher> teachers = new ArrayList<>();


    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RecurringSchedule> recurringSchedules = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(
            name = "group_students",
            joinColumns = @JoinColumn(name = "group_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<Student> students = new ArrayList<>();

    @OneToMany(mappedBy = "group", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Schedule> schedules = new ArrayList<>();

    public Group(String name) {
        if (name == null || name.trim().isEmpty()) {
            throw new IllegalArgumentException("Dance group groupName must not be blank");
        }
        this.name = name;
    }
}

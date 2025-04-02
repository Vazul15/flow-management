package com.codecool.backend.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String publicId = UUID.randomUUID().toString();

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

    @NotNull
    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    private GenderType gender;

    @ManyToOne
    private Parent parent;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentAttendance> studentAttendances = new ArrayList<>();

    @ManyToMany(mappedBy = "students", cascade = CascadeType.MERGE)
    private List<Group> groups = new ArrayList<>();

    public Student(String firstName, String lastName, LocalDate birthday, GenderType gender, Parent parent) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.gender = gender;
        this.parent = parent;
        this.groups = new ArrayList<>();
    }

    public Student(String firstName, String lastName, LocalDate birthday, GenderType gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
        this.gender = gender;
        this.groups = new ArrayList<>();
    }
}

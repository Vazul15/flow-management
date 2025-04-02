package com.codecool.backend.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;

import java.util.List;
import java.util.UUID;


@Entity
@NoArgsConstructor
@Data
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String publicId = UUID.randomUUID().toString();

    private String firstName;

    private String lastName;

    @NotBlank
    @Email
    private String email;

    private LocalDate birthday;

    private String phoneNumber;

    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "teacher_role",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles = new ArrayList<>();

    @OneToOne(fetch = FetchType.EAGER)
    @JoinTable(
            name = "teacher_location",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "location_id")
    )
    private Location location;

    @OneToMany(mappedBy = "teacher", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TeacherAttendance> teacherAttendances;

    @ManyToMany(mappedBy = "teachers")
    private List<Group> groups;

    public Teacher(String email, String firstName, String password) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
    }
}

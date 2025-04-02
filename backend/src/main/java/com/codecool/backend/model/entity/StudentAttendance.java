package com.codecool.backend.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentAttendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Schedule schedule;

    @Enumerated(EnumType.STRING)
    private AttendanceState present;

    @ManyToOne(fetch = FetchType.LAZY)
    private Student student;

    public StudentAttendance(Schedule schedule, AttendanceState present, Student student) {
        this.schedule = schedule;
        this.present = present;
        this.student = student;
    }
}

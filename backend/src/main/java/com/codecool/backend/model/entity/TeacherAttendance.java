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
public class TeacherAttendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Schedule schedule;

    @Enumerated(EnumType.STRING)
    private AttendanceState present;

    @ManyToOne(fetch = FetchType.LAZY)
    private Teacher teacher;

    public TeacherAttendance(Schedule schedule, AttendanceState present, Teacher teacher) {
        this.schedule = schedule;
        this.present = present;
        this.teacher = teacher;
    }
}

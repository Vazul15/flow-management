package com.codecool.backend.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDate date;

    @NotNull
    private Boolean present;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Teacher teacher;

    @ManyToOne
    private DanceGroup danceGroup;

    public Attendance( LocalDate date , Boolean present, Student student, DanceGroup danceGroup) {
        this.teacher = teacher;
        this.student = student;
        this.present = present;
        this.date = date;
        this.danceGroup = danceGroup;
    }

    public Attendance(LocalDate date , Boolean present, Teacher teacher, DanceGroup danceGroup) {
        this.present = present;
        this.date = date;
        this.teacher = teacher;
        this.danceGroup = danceGroup;
    }
}

package com.codecool.backend.model.dto.request.student;

import com.codecool.backend.model.entity.GenderType;

import java.time.LocalDate;

public record NewStudentRequestDTO(String firstName, String lastName, LocalDate birthDate, GenderType gender, String parentEmail, String parentPhoneNumber) {
}

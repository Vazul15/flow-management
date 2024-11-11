package com.codecool.backend.model.dto.response.attendance;

import java.time.LocalDate;

public record AttendanceStudentResponseDTO(long studentId, String firstName, String lastName, Boolean isPresent) {
}

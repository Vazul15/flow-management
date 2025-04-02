package com.codecool.backend.model.dto.response.attendance;

public record AttendanceStudentResponseDTO(String studentPublicId, String firstName, String lastName, Boolean isPresent) {
}

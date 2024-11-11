package com.codecool.backend.model.dto.response.attendance;

public record AttendanceTeacherResponseDTO(String teacherEmail, String firstName, String lastName, Boolean isPresent) {
}

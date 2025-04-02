package com.codecool.backend.model.dto.request.attendance;

import java.time.LocalDate;

public record AttendanceStudentIdRequestDTO(String publicId, LocalDate date, boolean isPresent, long studentId, String danceGroupName) {
}
package com.codecool.backend.model.dto.request.attendance;

import java.time.LocalDate;

public record AttendanceTeacherEmailRequestDTO(LocalDate date, boolean isPresent, String teacherEmail, String danceGroupName) {
}

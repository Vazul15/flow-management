package com.codecool.backend.model.dto.request.attendance;

import java.time.LocalDate;

public record AttendanceLocalDateDanceGroupNameRequestDTO(LocalDate localDate, String danceGroupName) {
}

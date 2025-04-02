package com.codecool.backend.model.dto.request.studentAttendance;

import com.codecool.backend.model.entity.AttendanceState;

import java.time.LocalDate;
import java.time.LocalTime;

public record StudentAttendanceNewPresentRequestDTO(String studentPublicId, String groupName, LocalDate date, LocalTime startTime, LocalTime endTime, AttendanceState isPresent) {
}

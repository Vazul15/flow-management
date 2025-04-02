package com.codecool.backend.model.dto.request.studentAttendance;

import java.time.LocalDate;
import java.time.LocalTime;

public record StudentAttendanceGroupNameDateStartEndTime(String groupName, LocalDate date, LocalTime startTime, LocalTime endTime) {
}

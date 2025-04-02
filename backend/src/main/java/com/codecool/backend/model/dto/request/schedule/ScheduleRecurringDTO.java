package com.codecool.backend.model.dto.request.schedule;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public record ScheduleRecurringDTO(LocalDate startDate, LocalDate endDate, LocalTime startTime, LocalTime endTime, String teacherPublicId, String groupName, List<DayOfWeek> recurringDays) {
}

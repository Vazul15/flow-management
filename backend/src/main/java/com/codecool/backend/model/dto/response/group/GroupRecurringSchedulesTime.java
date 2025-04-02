package com.codecool.backend.model.dto.response.group;

import java.time.LocalTime;

public record GroupRecurringSchedulesTime(LocalTime startTime, LocalTime endTime) {
}

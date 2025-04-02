package com.codecool.backend.model.dto.request.schedule;

import java.time.LocalDate;
import java.time.LocalTime;

public record ScheduleDateStartEndTimeTeacherPublicIdGroupNameRequestDTO(LocalDate date, LocalTime startTime, LocalTime endTime, String teacherPublicId, String groupName) {
}

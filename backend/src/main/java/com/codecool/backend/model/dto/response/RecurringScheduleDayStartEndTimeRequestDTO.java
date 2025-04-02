package com.codecool.backend.model.dto.response;

public record RecurringScheduleDayStartEndTimeRequestDTO(String dayOfWeek,
                                                         String startTime,
                                                         String endTime)

{}

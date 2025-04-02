package com.codecool.backend.exception.attendance;

public class ScheduleNotFoundByDateGroupStartEndTime extends RuntimeException {
    public ScheduleNotFoundByDateGroupStartEndTime(String message) {
        super(message);
    }
}

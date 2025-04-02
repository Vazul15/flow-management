package com.codecool.backend.exception.attendance;

public class StudentAttendanceNotFound extends RuntimeException {
    public StudentAttendanceNotFound(String message) {
        super(message);
    }
}

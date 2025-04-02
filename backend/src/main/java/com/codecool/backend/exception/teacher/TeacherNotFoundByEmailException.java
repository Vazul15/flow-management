package com.codecool.backend.exception.teacher;

public class TeacherNotFoundByEmailException extends RuntimeException {
    public TeacherNotFoundByEmailException(String message) {
        super(message);
    }
}

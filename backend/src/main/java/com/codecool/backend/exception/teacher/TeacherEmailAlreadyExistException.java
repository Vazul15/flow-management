package com.codecool.backend.exception.teacher;

public class TeacherEmailAlreadyExistException extends RuntimeException {
    public TeacherEmailAlreadyExistException(String message) {
        super(message);
    }
}

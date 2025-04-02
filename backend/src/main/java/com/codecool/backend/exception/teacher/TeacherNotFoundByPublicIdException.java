package com.codecool.backend.exception.teacher;

public class TeacherNotFoundByPublicIdException extends RuntimeException {
    public TeacherNotFoundByPublicIdException(String message) {
        super(message);
    }
}

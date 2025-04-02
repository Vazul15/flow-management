package com.codecool.backend.exception.group;

public class TeacherIsNotPartOfGroupException extends RuntimeException {
    public TeacherIsNotPartOfGroupException(String message) {
        super(message);
    }
}

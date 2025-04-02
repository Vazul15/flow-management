package com.codecool.backend.exception.group;

public class TeacherAlreadyPartOfGroupException extends RuntimeException {
    public TeacherAlreadyPartOfGroupException(String message) {
        super(message);
    }
}

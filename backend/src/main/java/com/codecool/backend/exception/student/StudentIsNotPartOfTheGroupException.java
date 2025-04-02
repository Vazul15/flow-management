package com.codecool.backend.exception.student;

public class StudentIsNotPartOfTheGroupException extends RuntimeException {
    public StudentIsNotPartOfTheGroupException(String message) {
        super(message);
    }
}

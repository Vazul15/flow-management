package com.codecool.backend.exception.group;

public class StudentAlreadyPartOfGroupException extends RuntimeException {
    public StudentAlreadyPartOfGroupException(String message) {
        super(message);
    }
}

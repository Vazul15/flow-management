package com.codecool.backend.exception.dancegroup;

public class StudentAlreadyPartOfTheDanceGroupException extends RuntimeException {
    public StudentAlreadyPartOfTheDanceGroupException(String message) {
        super(message);
    }
}

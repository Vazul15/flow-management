package com.codecool.backend.exception.dancegroup;

public class DanceGroupAlreadyExistException extends RuntimeException {
    public DanceGroupAlreadyExistException(String message) {
        super(message);
    }
}

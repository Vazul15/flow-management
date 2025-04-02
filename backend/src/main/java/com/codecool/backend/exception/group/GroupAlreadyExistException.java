package com.codecool.backend.exception.group;

public class GroupAlreadyExistException extends RuntimeException {
    public GroupAlreadyExistException(String message) {
        super(message);
    }
}

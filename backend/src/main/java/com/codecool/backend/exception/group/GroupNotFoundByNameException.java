package com.codecool.backend.exception.group;

public class GroupNotFoundByNameException extends RuntimeException {
    public GroupNotFoundByNameException(String message) {
        super(message);
    }
}

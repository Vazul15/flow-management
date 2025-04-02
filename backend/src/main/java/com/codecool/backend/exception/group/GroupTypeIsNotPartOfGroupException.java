package com.codecool.backend.exception.group;

public class GroupTypeIsNotPartOfGroupException extends RuntimeException {
    public GroupTypeIsNotPartOfGroupException(String message) {
        super(message);
    }
}

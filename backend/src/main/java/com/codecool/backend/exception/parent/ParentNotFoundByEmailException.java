package com.codecool.backend.exception.parent;

public class ParentNotFoundByEmailException extends RuntimeException {
    public ParentNotFoundByEmailException(String message) {
        super(message);
    }
}

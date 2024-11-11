package com.codecool.backend.model.dto.request.dancegroup;

public class DanceTypeAlreadyPartOfTheGroup extends RuntimeException {
    public DanceTypeAlreadyPartOfTheGroup(String message) {
        super(message);
    }
}

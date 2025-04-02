package com.codecool.backend.model.payload;

import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String email;
}

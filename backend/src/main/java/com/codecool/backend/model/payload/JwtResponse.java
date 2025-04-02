package com.codecool.backend.model.payload;

import java.util.List;

public record JwtResponse(String jwt, String userEmail, String userPublicId, List<String> roles) {
}

package com.codecool.backend.model.dto.response.student;

public record StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO(String publicId, String firstName, String lastName, int age, String parentEmail, String parentPhoneNumber) {
}

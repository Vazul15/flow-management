package com.codecool.backend.model.dto.response.attendance;

import com.codecool.backend.model.entity.AttendanceState;

public record StudentAttendancePublicIdFirstNameLastNameIsPresentResponseDTO(String publicId, String firstName, String lastName, AttendanceState isPresent) {
}

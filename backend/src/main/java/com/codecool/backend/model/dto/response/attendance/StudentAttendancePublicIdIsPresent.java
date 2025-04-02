package com.codecool.backend.model.dto.response.attendance;

import com.codecool.backend.model.entity.AttendanceState;

public record StudentAttendancePublicIdIsPresent(String studentPublicId, AttendanceState isPresent) {
}

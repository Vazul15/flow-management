package com.codecool.backend.model.dto.request.dancegroup;

import com.codecool.backend.model.entity.DanceType;

import java.util.Set;

public record DanceGroupNameDanceTypesRequestDTO(String danceGroupName, Set<DanceType> danceTypes) {
}

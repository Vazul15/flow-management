package com.codecool.backend.model.dto.request.group;

import com.codecool.backend.model.entity.GroupType;

import java.util.Set;

public record GroupNameGroupTypesRequestDTO(String groupName, Set<GroupType> groupTypes) {
}

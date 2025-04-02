package com.codecool.backend.model.dto.response.group;

import com.codecool.backend.model.entity.GroupLevel;
import com.codecool.backend.model.entity.GroupType;

import java.util.Set;

public record GroupNameGroupTypesGroupLevelResponseDTO(String groupName, Set<GroupType> groupTypes, GroupLevel groupLevel) {
}
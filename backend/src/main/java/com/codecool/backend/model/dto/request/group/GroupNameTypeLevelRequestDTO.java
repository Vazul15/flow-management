package com.codecool.backend.model.dto.request.group;

import com.codecool.backend.model.entity.GroupType;
import com.codecool.backend.model.entity.GroupLevel;

public record GroupNameTypeLevelRequestDTO(String groupName, GroupType[] groupTypes, GroupLevel groupLevel) {
}

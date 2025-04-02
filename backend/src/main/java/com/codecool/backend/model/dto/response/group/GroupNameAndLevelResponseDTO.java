package com.codecool.backend.model.dto.response.group;

import com.codecool.backend.model.entity.GroupLevel;

public record GroupNameAndLevelResponseDTO(String groupName, GroupLevel groupLevel) {
}

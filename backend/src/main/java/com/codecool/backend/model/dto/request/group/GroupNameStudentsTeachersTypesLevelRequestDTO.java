package com.codecool.backend.model.dto.request.group;

import com.codecool.backend.model.entity.GroupLevel;
import com.codecool.backend.model.entity.GroupType;
import java.util.Set;

public record GroupNameStudentsTeachersTypesLevelRequestDTO(String groupName, Set<GroupType> groupTypes, GroupLevel groupLevel) {
}

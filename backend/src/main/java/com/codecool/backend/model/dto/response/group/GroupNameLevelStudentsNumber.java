package com.codecool.backend.model.dto.response.group;

import com.codecool.backend.model.entity.GroupLevel;

public record GroupNameLevelStudentsNumber(String groupName, GroupLevel groupLevel, Long studentsNumber) {
}

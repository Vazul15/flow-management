package com.codecool.backend.model.dto.request;

import com.codecool.backend.model.dto.response.RecurringScheduleDayStartEndTimeRequestDTO;
import com.codecool.backend.model.entity.GroupLevel;
import com.codecool.backend.model.entity.GroupType;

import java.util.List;
import java.util.Set;

public record GroupNameLevelTypesRecurringScheduleRequestDTO(String groupName, Set<GroupType> groupTypes, GroupLevel groupLevel, List<RecurringScheduleDayStartEndTimeRequestDTO> schedule) {
}

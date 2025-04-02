package com.codecool.backend.model.dto.request.group;

import java.util.Set;

public record TeachersPublicIdsGroupNameDTO(Set<String> teachersPublicIds, String groupName) {
}

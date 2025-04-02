package com.codecool.backend.model.dto.request.group;

import java.util.Set;

public record StudentsPublicIdGroupName(Set<String> studentsPublicId, String groupName) {
}

package com.codecool.backend.controller;

import com.codecool.backend.model.dto.request.GroupNameLevelTypesRecurringScheduleRequestDTO;
import com.codecool.backend.model.dto.request.group.*;
import com.codecool.backend.model.dto.response.group.GroupNameAndLevelResponseDTO;
import com.codecool.backend.model.dto.response.group.GroupNameLevelStudentsNumber;
import com.codecool.backend.model.dto.response.group.GroupRecurringSchedulesTime;
import com.codecool.backend.model.dto.response.student.StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO;
import com.codecool.backend.model.dto.response.teacher.TeacherPublicIdNameEmailNumberResponseDTO;
import com.codecool.backend.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Set;

@RestController
@RequestMapping("/api/group")
public class GroupController {
    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @PostMapping(path = "")
    public long createGroup(@RequestBody GroupNameTypeLevelRequestDTO requestDTO) {
        return groupService.createGroup(requestDTO);
    }

    @GetMapping(path="")
    public GroupNameLevelTypesRecurringScheduleRequestDTO getGroupByName(@RequestParam String name) {
        return groupService.getGroupByName(name);
    }

    @GetMapping(path = "/all")
    public Set<GroupNameLevelStudentsNumber> getAllGroupsNameLevelStudentNumber() {
    return groupService.getAllGroupsNameLevelStudentsNumber();
    }

    //TODO authentication point for this one
    @GetMapping(path= "/all/names")
    public Set<GroupNameAndLevelResponseDTO> getAllGroupNamesAndLevel() {
        return groupService.getAllGroupNamesAndLevel();
    }

    @GetMapping(path = "/all/ownGroupNames")
    public Set<GroupNameAndLevelResponseDTO> getAllOwnGroupNamesAndLevel(@RequestParam String publicId) {
        return groupService.getAllOwnGroupNamesAndLevel(publicId);
    }

    @GetMapping(path="/students")
    public Set<StudentPublicIdFirstLastNameAgeParentEmailPhoneNumberRequestDTO> getStudentsByGroup(@RequestParam String name) {
        return groupService.getAllStudentsByGroup(name);
    }

    @GetMapping(path = "/teachers")
    public Set<TeacherPublicIdNameEmailNumberResponseDTO> getTeachersByGroup(@RequestParam String name) {
        return groupService.getAllTeachersByGroup(name);
    }

    @GetMapping("/recurring-schedules")
    public Set<GroupRecurringSchedulesTime> getRecurringSchedulesByGroup(@RequestParam String groupName,  @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return groupService.getRecurringSchedules(groupName, date);
    }

    @PutMapping(path = "/update/{groupName}")
    public long editGroup(@PathVariable String groupName, @RequestBody GroupNameLevelTypesRecurringScheduleRequestDTO groupData) {
        return groupService.updateGroup(groupName, groupData);
    }

    @PutMapping(path="/students")
    public long addStudentsToGroup(@RequestBody StudentsPublicIdGroupName requestDTO) {
        return groupService.addStudentsToGroup(requestDTO);
    }

    @PutMapping(path="/teachers")
    public long addTeacherToGroup(@RequestBody TeachersPublicIdsGroupNameDTO requestDTO) {
        return groupService.addTeachersToGroup(requestDTO);
    }

    @PutMapping(path="/type")
    public long addDanceTypeToGroup(@RequestBody GroupNameGroupTypesRequestDTO requestDTO) {
        return groupService.addGroupTypeToGroup(requestDTO);
    }

    @DeleteMapping(path="/{groupName}/teacher/{teacherPublicId}")
    public boolean deleteTeacherFromGroup(@PathVariable String groupName,
                                          @PathVariable String teacherPublicId) {
        return groupService.removeTeacherFromGroup(groupName, teacherPublicId);
    }

    @DeleteMapping(path= "/{groupName}/student/{studentPublicId}")
    public boolean deleteStudentsFromGroup(
            @PathVariable String groupName,
            @PathVariable String studentPublicId) {
        return  groupService.removeStudentFromGroup(groupName, studentPublicId);
    }

    @DeleteMapping(path="/types")
    public boolean deleteDanceTypeFromGroup(@RequestBody GroupNameGroupTypesRequestDTO requestDTO) {
        return groupService.removeGroupTypeFromGroup(requestDTO);
    }

    @DeleteMapping(path="")
    public void deleteGroupByName(@RequestParam String name) {
        groupService.deleteDanceGroupByName(name);
    }
}

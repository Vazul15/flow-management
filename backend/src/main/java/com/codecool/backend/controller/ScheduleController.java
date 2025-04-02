package com.codecool.backend.controller;

import com.codecool.backend.model.dto.request.schedule.ScheduleDateStartEndTimeTeacherPublicIdGroupNameRequestDTO;
import com.codecool.backend.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostMapping(path="")
    public Long addSchedule(@RequestBody ScheduleDateStartEndTimeTeacherPublicIdGroupNameRequestDTO newScheduleDTO) {
        return scheduleService.saveNewSchedule(newScheduleDTO);
    }
}

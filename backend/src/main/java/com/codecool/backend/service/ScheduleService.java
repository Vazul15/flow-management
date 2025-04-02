package com.codecool.backend.service;

import com.codecool.backend.model.dto.request.schedule.ScheduleDateStartEndTimeTeacherPublicIdGroupNameRequestDTO;
import com.codecool.backend.model.dto.request.schedule.ScheduleRecurringDTO;
import com.codecool.backend.model.entity.Group;
import com.codecool.backend.model.entity.Schedule;
import com.codecool.backend.repository.ScheduleRepository;
import com.codecool.backend.service.RetrieveStudentTeacherGroup.RetrieveStudentTeacherGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final RetrieveStudentTeacherGroupService retrieveStudentTeacherGroupService;

    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository, RetrieveStudentTeacherGroupService retrieveStudentTeacherGroupService) {
        this.scheduleRepository = scheduleRepository;
        this.retrieveStudentTeacherGroupService = retrieveStudentTeacherGroupService;
    }


    public Long saveNewSchedule(ScheduleDateStartEndTimeTeacherPublicIdGroupNameRequestDTO scheduleDTO) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(scheduleDTO.groupName());

        Schedule schedule = new Schedule(scheduleDTO.date(), scheduleDTO.startTime(), scheduleDTO.endTime(), foundGroup);
        Schedule savedSchedule = scheduleRepository.save(schedule);
        return savedSchedule.getId();
    }

    public List<Long> saveRecurringSchedule(ScheduleRecurringDTO scheduleDTO) {
        Group foundGroup = retrieveStudentTeacherGroupService.getGroupByName(scheduleDTO.groupName());

        List<Long> createdSchedulesIds = new ArrayList<>();
        LocalDate currentDate = scheduleDTO.startDate();

        while (!currentDate.isAfter(scheduleDTO.endDate())) {
            if (scheduleDTO.recurringDays().contains(currentDate.getDayOfWeek())) {
                Schedule schedule = new Schedule(currentDate, scheduleDTO.startTime(), scheduleDTO.endTime(), foundGroup);
                Schedule savedSchedule = scheduleRepository.save(schedule);
                createdSchedulesIds.add(savedSchedule.getId());
            }
            currentDate = currentDate.plusDays(1);
        }

        return createdSchedulesIds;
    }

    public Schedule findScheduleByGroupAndDateIfNotExsistCreateSchedule(Group group, LocalDate date, LocalTime startTime, LocalTime endTime) {
        return scheduleRepository.findByDateAndGroupAndStartTimeAndEndTime(date, group, startTime, endTime)
                .orElseGet(() -> {
                    Schedule newSchedule = new Schedule(date, startTime, endTime, group);
                    scheduleRepository.save(newSchedule);
                    return newSchedule;
                });
    }
}

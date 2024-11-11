package com.codecool.backend.service;

import com.codecool.backend.exception.dancegroup.DanceGroupNotFoundException;
import com.codecool.backend.exception.student.StudentNotFoundException;
import com.codecool.backend.exception.teacher.TeacherNotFoundException;
import com.codecool.backend.model.dto.request.attendance.AttendanceLocalDateDanceGroupNameRequestDTO;
import com.codecool.backend.model.dto.request.attendance.AttendanceStudentIdRequestDTO;
import com.codecool.backend.model.dto.request.attendance.AttendanceTeacherEmailRequestDTO;
import com.codecool.backend.model.dto.response.attendance.AttendanceStudentResponseDTO;
import com.codecool.backend.model.dto.response.attendance.AttendanceTeacherResponseDTO;
import com.codecool.backend.model.entity.Attendance;
import com.codecool.backend.model.entity.DanceGroup;
import com.codecool.backend.model.entity.Student;
import com.codecool.backend.model.entity.Teacher;
import com.codecool.backend.repository.AttendanceRepository;
import com.codecool.backend.repository.DanceGroupRepository;
import com.codecool.backend.repository.StudentRepository;
import com.codecool.backend.repository.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final DanceGroupRepository danceGroupRepository;

    public AttendanceService(AttendanceRepository attendanceRepository, StudentRepository studentRepository, TeacherRepository teacherRepository, DanceGroupRepository danceGroupRepository) {
        this.attendanceRepository = attendanceRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
        this.danceGroupRepository = danceGroupRepository;
    }

    public long markStudentAttendance(AttendanceStudentIdRequestDTO attendanceDTO) {
        Student student = getStudentById(attendanceDTO.studentId());
        DanceGroup danceGroup = retrieveDanceGroupForAttendance(attendanceDTO.danceGroupName());
        Attendance studentAttendance = new Attendance(attendanceDTO.date(), attendanceDTO.isPresent(), student, danceGroup );

        Attendance attendance = attendanceRepository.save(studentAttendance);
        return attendance.getId();
    }

    public long markTeacherAttendance(AttendanceTeacherEmailRequestDTO teacherAttendanceDTO) {
        Teacher foundTeacher = getTeacherByEmail(teacherAttendanceDTO.teacherEmail());
        DanceGroup foundDanceGroup = retrieveDanceGroupForAttendance(teacherAttendanceDTO.danceGroupName());
        Attendance teacherAttendance = new Attendance(teacherAttendanceDTO.date(), teacherAttendanceDTO.isPresent(), foundTeacher, foundDanceGroup);

        Attendance attendance = attendanceRepository.save(teacherAttendance);
        return attendance.getId();
    }

    public List<AttendanceStudentResponseDTO> getAttendanceForStudentsByGroupAndDate(AttendanceLocalDateDanceGroupNameRequestDTO attendanceDto) {
        DanceGroup danceGroup = retrieveDanceGroupForAttendance(attendanceDto.danceGroupName());

        return danceGroup.getStudents().stream()
                .map(student -> {
                    Attendance attendance = attendanceRepository.findByStudentAndDate(student, attendanceDto.localDate())
                            .orElseGet(() -> {
                                Attendance newStudentAttendance = new Attendance(attendanceDto.localDate(), null, student, danceGroup);
                                return attendanceRepository.save(newStudentAttendance);
                            });
                    return new AttendanceStudentResponseDTO(student.getId(), student.getFirstName(), student.getLastName(), attendance.getPresent());
                })
                .toList();
    }

    public List<AttendanceTeacherResponseDTO> getAttendanceForTeachersByGroupAndDate(AttendanceLocalDateDanceGroupNameRequestDTO attendanceDto) {
        DanceGroup danceGroup = retrieveDanceGroupForAttendance(attendanceDto.danceGroupName());

        return danceGroup.getTeachers().stream()
                .map(teacher -> {
                    Attendance attendance = attendanceRepository.findByTeacherAndDate(teacher, attendanceDto.localDate())
                            .orElseGet(() -> {
                                Attendance newTeacherAttendance = new Attendance(attendanceDto.localDate(), null, teacher, danceGroup);
                                return attendanceRepository.save(newTeacherAttendance);
                            });
                    return new AttendanceTeacherResponseDTO(teacher.getEmail(), teacher.getFirstName(), teacher.getLastName(), attendance.getPresent());
                })
                .toList();
    }

    private Student getStudentById(long studentId) {
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student with the Id: " + studentId + " not found"));
    }

    private DanceGroup retrieveDanceGroupForAttendance(String danceGroupName) {
        return danceGroupRepository.findByName(danceGroupName)
                .orElseThrow(() -> new DanceGroupNotFoundException("Dance group with the danceGroupName " + danceGroupName + " not found"));
    }

    private Teacher getTeacherByEmail(String email) {
        return teacherRepository.findTeacherByEmail(email)
                .orElseThrow(() -> new TeacherNotFoundException("Teacher with the email " + email + " not found"));
    }

}

package com.codecool.backend.service.RetrieveStudentTeacherGroup;


import com.codecool.backend.exception.group.GroupNotFoundByNameException;
import com.codecool.backend.exception.student.StudentNotFoundException;
import com.codecool.backend.exception.teacher.TeacherNotFoundByPublicIdException;
import com.codecool.backend.model.entity.Group;
import com.codecool.backend.model.entity.Student;
import com.codecool.backend.model.entity.Teacher;
import com.codecool.backend.repository.GroupRepository;
import com.codecool.backend.repository.StudentRepository;
import com.codecool.backend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RetrieveStudentTeacherGroupService {
    public final TeacherRepository teacherRepository;
    public final GroupRepository groupRepository;
    public final StudentRepository studentRepository;

    @Autowired
    public RetrieveStudentTeacherGroupService(TeacherRepository teacherRepository, GroupRepository groupRepository, StudentRepository studentRepository) {
        this.teacherRepository = teacherRepository;
        this.groupRepository = groupRepository;
        this.studentRepository = studentRepository;
    }

    public Teacher getTeacherByPublicId(String publicId) throws TeacherNotFoundByPublicIdException {
        return findTeacher(publicId);
    }

    public Group getGroupByName(String groupName) throws GroupNotFoundByNameException {
        return findGroup(groupName);
    }

    public Student getStudentByPublicId(String publicId) throws StudentNotFoundException {
        return findStudent(publicId);
    }

    private Student findStudent(String publicId) {
        return studentRepository.findByPublicId(publicId)
                .orElseThrow(() -> new StudentNotFoundException("Student with the publicId " + publicId + " not found"));
    }

    private Group findGroup(String groupName) {
        return groupRepository.findByName(groupName)
                .orElseThrow(() -> new GroupNotFoundByNameException("Dance group with the groupName " + groupName + " not found"));
    }

    private Teacher findTeacher(String publicId) {
        return teacherRepository.findByPublicId(publicId).orElseThrow(
                () -> new TeacherNotFoundByPublicIdException("Teacher with the publicId: " + publicId + " not found")
        );
    }
}

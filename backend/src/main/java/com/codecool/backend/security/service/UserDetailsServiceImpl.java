package com.codecool.backend.security.service;

import com.codecool.backend.exception.teacher.TeacherNotFoundByEmailException;
import com.codecool.backend.model.entity.Role;
import com.codecool.backend.model.entity.Teacher;
import com.codecool.backend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final TeacherRepository teacherRepository;

    @Autowired
    public UserDetailsServiceImpl(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Teacher teacherEntity = teacherRepository.findTeacherByEmail(email).
                orElseThrow(() -> new TeacherNotFoundByEmailException(email));

        List<SimpleGrantedAuthority> roles = new ArrayList<>();
        for (Role role : teacherEntity.getRoles()) {
            roles.add(new SimpleGrantedAuthority(role.getRoleType().toString()));
        }
        return new CustomUserDetails( teacherEntity.getEmail(), teacherEntity.getPassword(), teacherEntity.getPublicId(), roles );

    }
}

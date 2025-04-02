package com.codecool.backend.security.config;

import com.codecool.backend.security.jwt.AuthEntryPointJwt;
import com.codecool.backend.security.jwt.AuthTokenFilter;
import com.codecool.backend.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    private final UserDetailsService userDetailsService;
    private final AuthEntryPointJwt unauthorizedHandler;
    private final JwtUtils jwtUtils;

    @Autowired
    public WebSecurityConfig(UserDetailsService userDetailsService, AuthEntryPointJwt unauthorizedHandler, JwtUtils jwtUtils) {
        this.userDetailsService = userDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
        this.jwtUtils = jwtUtils;
    }

    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter(jwtUtils, userDetailsService);
    }

    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable()).cors(cors -> cors.disable())
                .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth ->
                        auth.requestMatchers(HttpMethod.POST,"/api/teacher/register").permitAll()
                                .requestMatchers(HttpMethod.POST,"/api/teacher/login").permitAll()
                                .requestMatchers(HttpMethod.GET,"/api/teacher/all/except-group").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET,"/api/teacher").hasAnyRole("ADMIN", "TEACHER")
                                .requestMatchers(HttpMethod.PUT,"/api/teacher").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST,"/api/student").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET,"/api/student").hasAnyRole("ADMIN", "TEACHER")
                                .requestMatchers(HttpMethod.GET,"/api/student/all").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET,"/api/student/all/except-group").hasAnyRole("ADMIN", "TEACHER")
                                .requestMatchers(HttpMethod.PUT,"/api/student/").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE,"/api/student/").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.POST,"/api/group").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET,"/api/group").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET,"/api/group/all").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET,"/api/group/all/names").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET,"/api/group/all/ownGroupNames").hasAnyRole("ADMIN", "TEACHER")
                                .requestMatchers(HttpMethod.GET,"/api/group/students").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.GET,"/api/group/teachers").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE,"/api/group/{groupName}/teacher/{teacherPublicId}").hasAnyRole("ADMIN", "TEACHER")
                                .requestMatchers(HttpMethod.PUT,"/api/group/students").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT,"/api/group/update/{groupName}").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT,"/api/group/teacher").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.PUT,"/api/group/group-type").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE,"/api/group/teacher").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE,"/api/group/students").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE,"/api/group/types").hasRole("ADMIN")
                                .requestMatchers(HttpMethod.DELETE,"/api/group").hasRole("ADMIN")
                                .requestMatchers("/api/statistics").hasRole("ADMIN")
                                .requestMatchers("/api/statistics/students/{groupName}").hasRole("ADMIN")
                                .requestMatchers("/error").permitAll()
                                .anyRequest().authenticated()

                );

        http.authenticationProvider(authenticationProvider());

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}


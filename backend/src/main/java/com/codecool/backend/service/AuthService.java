package com.codecool.backend.service;

import com.codecool.backend.exception.UnauthorizedException;
import com.codecool.backend.model.payload.JwtResponse;
import com.codecool.backend.model.payload.LoginRequest;
import com.codecool.backend.security.jwt.JwtUtils;
import com.codecool.backend.security.service.CustomUserDetails;  // Importáld be a CustomUserDetails osztályt
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;

import java.util.List;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthService(AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtils.generateJwtToken(authentication);

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            return new JwtResponse(jwt, userDetails.getUsername(), userDetails.getPublicId(), roles);
        } catch (BadCredentialsException exception) {
            throw new UnauthorizedException("Invalid e-mail or password.");
        }
    }
}

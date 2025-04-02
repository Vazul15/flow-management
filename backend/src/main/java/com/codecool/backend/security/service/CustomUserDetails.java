package com.codecool.backend.security.service;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.CredentialsContainer;
import java.util.Collection;

public class CustomUserDetails implements UserDetails, CredentialsContainer {
    private String username;
    private String password;
    private String publicId;
    private Collection<? extends GrantedAuthority> authorities;

    public CustomUserDetails(String username, String password, String publicId, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.publicId = publicId;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getPublicId() {
        return publicId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public void eraseCredentials() {
        this.password = null;
    }
}

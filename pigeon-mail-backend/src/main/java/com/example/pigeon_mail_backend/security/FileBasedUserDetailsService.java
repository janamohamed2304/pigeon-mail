package com.example.pigeon_mail_backend.security;

import com.example.pigeon_mail_backend.service.FileSystemService;
import com.example.pigeon_mail_backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;

@Service
public class FileBasedUserDetailsService implements UserDetailsService {

    @Autowired
    private FileSystemService fileSystemService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try {
            return fileSystemService.getUser(email)
                .map(user -> createUserDetails(user))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        } catch (IOException e) {
            throw new UsernameNotFoundException("Error loading user: " + e.getMessage());
        }
    }

    private UserDetails createUserDetails(User user) {
        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getHashedPassword(), // Using the hashedPassword field instead of password
            Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }
}
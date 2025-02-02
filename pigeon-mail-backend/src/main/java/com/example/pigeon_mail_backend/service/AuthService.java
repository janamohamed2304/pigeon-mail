package com.example.pigeon_mail_backend.service;

import com.example.pigeon_mail_backend.model.User;
import com.example.pigeon_mail_backend.security.JwtTokenProvider;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.io.IOException;
import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private FileSystemService fileSystemService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    private final org.slf4j.Logger log = LoggerFactory.getLogger(AuthService.class);

    public User registerUser(User user) throws IOException {
        log.debug("Starting user registration process for email: {}", user.getEmail());
        
        try {
            // Hash the password
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setHashedPassword(hashedPassword);
            user.setPassword(null); // Clear the plain text password
            
            // Save the user
            fileSystemService.saveUser(user.getEmail(), user);
            log.info("User registration successful for email: {}", user.getEmail());
            return user;
        } catch (Exception e) {
            log.error("Error during user registration: ", e);
            throw e;
        }
    }


    public User loginUser(String email, String password) throws IOException {
        log.debug("Starting login process for email: {}", email);
        
        try {
            // Check if user exists
            Optional<User> userOptional = fileSystemService.getUser(email);
            
            if (userOptional.isEmpty()) {
                log.warn("Login attempt failed: user not found for email: {}", email);
                throw new RuntimeException("Invalid email or password");
            }
            
            User user = userOptional.get();
            
            // Verify password
            if (!passwordEncoder.matches(password, user.getHashedPassword())) {
                log.warn("Login attempt failed: invalid password for email: {}", email);
                throw new RuntimeException("Invalid email or password");
            }
            
            log.info("Login successful for email: {}", email);
            return user;
            
        } catch (IOException e) {
            log.error("Error during login process: ", e);
            throw e;
        }
    }
}
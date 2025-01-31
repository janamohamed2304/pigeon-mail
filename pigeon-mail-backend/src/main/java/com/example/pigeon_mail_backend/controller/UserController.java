package com.example.pigeon_mail_backend.controller;

import com.example.pigeon_mail_backend.model.User;
import com.example.pigeon_mail_backend.security.JwtTokenProvider;
import com.example.pigeon_mail_backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {
    
    private final Logger log = LoggerFactory.getLogger(UserController.class);
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        try {
            log.debug("Received request body: {}", user);  // Add this line
            User createdUser = authService.registerUser(user);
            String token = jwtTokenProvider.generateToken(user.getEmail());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", createdUser);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Add detailed error logging
            log.error("Detailed error in signup: ", e);
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                    "error", "Registration failed",
                    "message", e.getMessage(),
                    "type", e.getClass().getSimpleName()
                ));
        }
    }
}
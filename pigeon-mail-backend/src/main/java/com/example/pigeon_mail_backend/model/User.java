package com.example.pigeon_mail_backend.model;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

@Data
public class User {
    private String name;
    private String email;
    
    @JsonProperty // Explicitly include this in JSON
    private String hashedPassword;
    
    private LocalDateTime createdAt;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    
    public User() {
        this.createdAt = LocalDateTime.now();
    }
}
package com.example.pigeon_mail_backend.model;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

@Data
public class User {
    private String name;
    private String email;
    
    @JsonProperty
    private String hashedPassword;
    
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;
    
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    
    public User() {
        this.createdAt = LocalDateTime.now();
    }
}
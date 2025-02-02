package com.example.pigeon_mail_backend.model;

import java.time.LocalDateTime;

import lombok.Data;

// Email.java
@Data
public class Email {
    private String to;
    private String subject;
    private String message;
    private LocalDateTime sentAt;
    private String fromEmail;  // This will be set from the authenticated user
    
    public Email() {
        this.sentAt = LocalDateTime.now();
    }
}
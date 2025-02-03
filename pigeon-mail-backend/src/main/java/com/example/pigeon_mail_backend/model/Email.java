package com.example.pigeon_mail_backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class Email {
    private List<String> to; //added list of recipients
    private String subject;
    private String message;
    private LocalDateTime sentAt;
    private String fromEmail;
    private boolean isDeleted; //added isDeleted
    private boolean isRead; //added isRead
    private boolean isStarred; //added isStarred

    public Email() {
        this.sentAt = LocalDateTime.now();
        this.to = new ArrayList<>();
        this.isDeleted = false;
        this.isRead = false;
        this.isStarred = false;
    }
}
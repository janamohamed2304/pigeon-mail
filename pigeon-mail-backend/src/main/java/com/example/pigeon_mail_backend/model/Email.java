package com.example.pigeon_mail_backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class Email {
    private List<String> to;
    private String subject;
    private String message;
    private String priority;
    private LocalDateTime sentAt;
    private String fromEmail;
    private boolean isDeleted;
    private boolean isRead;
    private boolean isStarred;

    public Email() {
        this.sentAt = LocalDateTime.now();
        this.to = new ArrayList<>();
        this.isDeleted = false;
        this.isRead = false;
        this.isStarred = false;
    }
}
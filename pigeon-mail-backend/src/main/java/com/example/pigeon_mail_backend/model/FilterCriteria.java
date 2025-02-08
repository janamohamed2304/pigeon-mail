package com.example.pigeon_mail_backend.model;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;



@Data
public class FilterCriteria {
    
    private String subject;
    private String includeWords;
    private String date;
    private Priority priority;
    private List<String> senders ;
    private List<String> receivers;
    
    public enum Priority {
        urgent,
        average,
        low
    }

    public FilterCriteria() {
        this.senders = new ArrayList<>();
        this.receivers = new ArrayList<>();
    }
}

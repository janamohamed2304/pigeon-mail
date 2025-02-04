package com.example.pigeon_mail_backend.controller;

import com.example.pigeon_mail_backend.model.Email;
import com.example.pigeon_mail_backend.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/mail")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class EmailController {
    
    private final Logger log = LoggerFactory.getLogger(EmailController.class);
    
    @Autowired
    private EmailService emailService;
    
    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestBody Email email, Authentication authentication) {
        log.debug("Received email request from authenticated user");
        
        try {
            if (email.getTo() == null || email.getTo().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "At least one recipient is required"));
            }
            if (email.getSubject() == null || email.getSubject().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Subject is required"));
            }
            if (email.getMessage() == null || email.getMessage().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Message is required"));
            }
            
            String senderEmail = authentication.getName();
            email.setFromEmail(senderEmail);
            emailService.sendEmail(email);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Email sent successfully");
            response.put("from", senderEmail);
            response.put("to", email.getTo());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Failed to send email", e);
            return ResponseEntity
                .internalServerError()
                .body(Map.of(
                    "error", "Failed to send email",
                    "details", e.getMessage()
                ));
        }
    }
}
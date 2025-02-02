package com.example.pigeon_mail_backend.service;

import com.example.pigeon_mail_backend.model.Email;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {
    
    private final Logger log = LoggerFactory.getLogger(EmailService.class);
    private final ObjectMapper mapper;
    
    @Autowired
    private FileSystemService fileSystemService;
    
    public EmailService() {
        this.mapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }
    
    public void sendEmail(Email email) throws Exception {
        log.debug("Starting email send process...");
        log.debug("From: {}", email.getFromEmail());
        log.debug("To: {}", email.getTo());
        log.debug("Subject: {}", email.getSubject());
        
        // Validate recipient exists
        if (!fileSystemService.userExists(email.getTo())) {
            log.error("Recipient does not exist: {}", email.getTo());
            throw new Exception("Recipient not found: " + email.getTo());
        }
        
        // Validate sender exists
        if (!fileSystemService.userExists(email.getFromEmail())) {
            log.error("Sender does not exist: {}", email.getFromEmail());
            throw new Exception("Sender not found: " + email.getFromEmail());
        }
        
        try {
            // Save to sender's sent folder
            saveToSentFolder(email);
            
            // Save to recipient's inbox
            saveToInbox(email);
            
            log.info("Email sent successfully from {} to {}", email.getFromEmail(), email.getTo());
        } catch (IOException e) {
            log.error("Failed to save email", e);
            throw new Exception("Failed to save email: " + e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error while sending email", e);
            throw new Exception("Failed to process email: " + e.getMessage());
        }
    }
    
    private void saveToSentFolder(Email email) throws IOException {
        String fileName = generateFileName(email);
        Path sentPath = Paths.get(
            fileSystemService.getRootPath(),
            "users",
            email.getFromEmail(),
            "sent",
            fileName
        );
        
        ensureDirectoryExists(sentPath.getParent());
        saveEmailToPath(email, sentPath);
        log.debug("Saved email to sent folder: {}", sentPath);
    }
    
    private void saveToInbox(Email email) throws IOException {
        String fileName = generateFileName(email);
        Path inboxPath = Paths.get(
            fileSystemService.getRootPath(),
            "users",
            email.getTo(),
            "inbox",
            fileName
        );
        
        ensureDirectoryExists(inboxPath.getParent());
        saveEmailToPath(email, inboxPath);
        log.debug("Saved email to inbox: {}", inboxPath);
    }
    
    private void ensureDirectoryExists(Path path) throws IOException {
        if (!Files.exists(path)) {
            log.debug("Creating directory: {}", path);
            Files.createDirectories(path);
        }
    }
    
    private void saveEmailToPath(Email email, Path path) throws IOException {
        try {
            mapper.writeValue(path.toFile(), email);
        } catch (IOException e) {
            log.error("Failed to save email to path: {}", path, e);
            throw e;
        }
    }
    
    private String generateFileName(Email email) {
        String sanitizedSubject = email.getSubject()
            .replaceAll("[^a-zA-Z0-9]", "_")
            .substring(0, Math.min(email.getSubject().length(), 50)); // Limit length
            
        return String.format("%s_%s.json",
            email.getSentAt().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss")),
            sanitizedSubject
        );
    }
}
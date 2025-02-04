package com.example.pigeon_mail_backend.service;
import com.example.pigeon_mail_backend.model.Email;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class EmailService {

    private final ObjectMapper mapper;
    
    @Autowired
    private FileSystemService fileSystemService;
    
    public EmailService() {
        this.mapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }
    
    public void sendEmail(Email email) throws Exception {
        
        List<String> invalidRecipients = new ArrayList<>();
        for (String recipient : email.getTo()) {
            if (!fileSystemService.userExists(recipient)) {
                invalidRecipients.add(recipient);
            }
        }
        
        if (!invalidRecipients.isEmpty()) {
            throw new Exception("Recipients not found: " + String.join(", ", invalidRecipients));
        }
        
        if (!fileSystemService.userExists(email.getFromEmail())) {
            throw new Exception("Sender not found: " + email.getFromEmail());
        }
        
        try {
            saveToSentFolder(email);
            
            for (String recipient : email.getTo()) {
                saveToInbox(email, recipient);
            }
            
        } catch (IOException e) {
            throw new Exception("Failed to save email: " + e.getMessage());
        } catch (Exception e) {
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
    }
    
    private void saveToInbox(Email email, String recipient) throws IOException {
        String fileName = generateFileName(email);
        Path inboxPath = Paths.get(
            fileSystemService.getRootPath(),
            "users",
            recipient,
            "inbox",
            fileName
        );
        
        ensureDirectoryExists(inboxPath.getParent());
        saveEmailToPath(email, inboxPath);
    }
    
    private void ensureDirectoryExists(Path path) throws IOException {
        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }
    }
    
    private void saveEmailToPath(Email email, Path path) throws IOException {
        try {
            mapper.writeValue(path.toFile(), email);
        } catch (IOException e) {
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
package com.example.pigeon_mail_backend.service;

import com.example.pigeon_mail_backend.model.Email;
import com.example.pigeon_mail_backend.model.User;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.io.IOException;
import java.nio.file.*;
import java.util.*;


@Service
@Slf4j
public class FileSystemService {
    
    private String rootPath;
    private final ObjectMapper mapper;

    public FileSystemService() {
        this.rootPath = System.getProperty("user.dir") + "/storage";
        this.mapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .setVisibility(PropertyAccessor.FIELD, Visibility.ANY)
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        createInitialStorage();
    }

    @PostConstruct
    public void initGitKeep() {
        try {
            Path gitKeepPath = Paths.get(rootPath, "users", ".gitkeep");
            if (!Files.exists(gitKeepPath)) {
                Files.createFile(gitKeepPath);
            }
        } catch (IOException e) {
            log.warn("Failed to create .gitkeep file: {}", e.getMessage());
        }
    }

    private void createInitialStorage() {
        try {
            Path storagePath = Paths.get(rootPath);
            Path usersPath = storagePath.resolve("users");
            
            if (!Files.exists(storagePath)) {
                Files.createDirectories(storagePath);
            }
            if (!Files.exists(usersPath)) {
                Files.createDirectories(usersPath);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize storage system", e);
        }
    }
    
    public void initializeUserDirectories(String email) throws IOException {
        Path userRoot = Paths.get(rootPath, "users", email);
        
        createDirectories(
            userRoot,
            userRoot.resolve("inbox"),
            userRoot.resolve("sent"),
            userRoot.resolve("draft"),
            userRoot.resolve("starred"),
            userRoot.resolve("trash"),
            userRoot.resolve("attachments")
        );
    }
    
    private void createDirectories(Path... paths) throws IOException {
        for (Path path : paths) {
            Files.createDirectories(path);
        }
    }
    
    public boolean userExists(String email) {
        return Files.exists(Paths.get(rootPath, "users", email));
    }
    
    public void saveUser(String email, User user) throws IOException {
        // First ensure directories exist
        initializeUserDirectories(email);
        Path userPath = Paths.get(rootPath, "users", email, "user.json");

        try {
            mapper.writerWithDefaultPrettyPrinter()
                    .writeValue(userPath.toFile(), user);
        } catch (Exception e) {
            throw e;
        }
    }
    
    public Optional<User> getUser(String email) throws IOException {
        Path userPath = Paths.get(rootPath, "users", email, "user.json");
        if (!Files.exists(userPath)) {
            return Optional.empty();
        }
        return Optional.of(mapper.readValue(userPath.toFile(), User.class));
    }

    public String getRootPath() {
        return this.rootPath;
    }

    public List<Email> readEmailsFromFolder(Path folderPath) {
        List<Email> emails = new ArrayList<>();
        if (!Files.exists(folderPath)) {
            log.warn("Folder does not exist: {}", folderPath);
            return emails;
        }

        try (DirectoryStream<Path> stream = Files.newDirectoryStream(folderPath, "*.json")) {
            ObjectMapper mapper = new ObjectMapper()
                .registerModule(new JavaTimeModule())
                .setVisibility(PropertyAccessor.FIELD, Visibility.ANY);
                
            for (Path file : stream) {
                try {
                    Email email = mapper.readValue(file.toFile(), Email.class);
                    emails.add(email);
                } catch (IOException e) {
                    log.error("Error reading email file: {}", file, e);
                }
            }
        } catch (IOException e) {
            log.error("Error reading folder: {}", folderPath, e);
        }

        // Sort emails by date descending
        emails.sort((e1, e2) -> e2.getSentAt().compareTo(e1.getSentAt()));
        return emails;
    }

    
}
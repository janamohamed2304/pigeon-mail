package com.example.pigeon_mail_backend.service;

import com.example.pigeon_mail_backend.model.User;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
@Slf4j
public class FileSystemService {
    
    private String rootPath;

    public FileSystemService() {
        this.rootPath = System.getProperty("user.dir") + "/storage";
        createInitialStorage();
    }

    @PostConstruct
    public void initGitKeep() {
        try {
            Path gitKeepPath = Paths.get(rootPath, "users", ".gitkeep");
            if (!Files.exists(gitKeepPath)) {
                Files.createFile(gitKeepPath);
                log.info("Created .gitkeep file at: {}", gitKeepPath);
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
                log.info("Created storage directory at: {}", storagePath);
            }
            if (!Files.exists(usersPath)) {
                Files.createDirectories(usersPath);
                log.info("Created users directory at: {}", usersPath);
            }
        } catch (IOException e) {
            log.error("Failed to create initial storage structure: {}", e.getMessage());
            throw new RuntimeException("Failed to initialize storage system", e);
        }
    }
    
    public void initializeUserDirectories(String email) throws IOException {
        Path userRoot = Paths.get(rootPath, "users", email);
        
        createDirectories(
            userRoot,
            userRoot.resolve("inbox"),
            userRoot.resolve("sent"),
            userRoot.resolve("drafts"),
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
        ObjectMapper mapper = new ObjectMapper();
        
        mapper.setVisibility(PropertyAccessor.FIELD, Visibility.ANY);
        mapper.findAndRegisterModules();
        
        try {
            mapper.writerWithDefaultPrettyPrinter()
                    .writeValue(userPath.toFile(), user);
            log.debug("User saved successfully with hashed password");
        } catch (Exception e) {
            log.error("Error saving user: {}", e.getMessage(), e);
            throw e;
        }
    }
    
    public Optional<User> getUser(String email) throws IOException {
        Path userPath = Paths.get(rootPath, "users", email, "user.json");
        if (!Files.exists(userPath)) {
            return Optional.empty();
        }
        ObjectMapper mapper = new ObjectMapper();
        return Optional.of(mapper.readValue(userPath.toFile(), User.class));
    }
}
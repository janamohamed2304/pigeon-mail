package com.example.pigeon_mail_backend.service;

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
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

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
}
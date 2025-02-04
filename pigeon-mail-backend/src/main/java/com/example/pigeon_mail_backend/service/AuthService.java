package com.example.pigeon_mail_backend.service;

import com.example.pigeon_mail_backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private FileSystemService fileSystemService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User registerUser(User user) throws IOException {
        
        try {
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setHashedPassword(hashedPassword);
            user.setPassword(null);

            fileSystemService.saveUser(user.getEmail(), user);
            return user;
        } catch (Exception e) {
            throw e;
        }
    }

    public User loginUser(String email, String password) throws IOException {
        
        try {
            Optional<User> userOptional = fileSystemService.getUser(email);
            
            if (userOptional.isEmpty()) {
                throw new RuntimeException("Invalid email or password");
            }
            
            User user = userOptional.get();
            
            if (!passwordEncoder.matches(password, user.getHashedPassword())) {
                throw new RuntimeException("Invalid email or password");
            }
            return user;
            
        } catch (IOException e) {
            throw e;
        }
    }
}
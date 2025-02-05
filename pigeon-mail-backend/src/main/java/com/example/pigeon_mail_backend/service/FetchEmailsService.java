package com.example.pigeon_mail_backend.service;

import com.example.pigeon_mail_backend.model.Email;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.nio.file.Path;
import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class FetchEmailsService {
    
    private final FileSystemService fileSystemService;
    
    public List<Email> fetchEmailsByFolder(String userEmail, String folder) {
        Path folderPath = Path.of(fileSystemService.getRootPath(), "users", userEmail, folder);
        return fileSystemService.readEmailsFromFolder(folderPath);
    }
    
    public List<Email> fetchStarredEmails(String userEmail) {
        return fetchEmailsByFolder(userEmail, "starred");
    }
    
    public List<Email> fetchInboxEmails(String userEmail) {
        return fetchEmailsByFolder(userEmail, "inbox");
    }
    
    public List<Email> fetchSentEmails(String userEmail) {
        return fetchEmailsByFolder(userEmail, "sent");
    }
    
    public List<Email> fetchDraftEmails(String userEmail) {
        return fetchEmailsByFolder(userEmail, "draft");
    }
    
    public List<Email> fetchTrashEmails(String userEmail) {
        return fetchEmailsByFolder(userEmail, "trash");
    }
}
package com.example.pigeon_mail_backend.service;

import com.example.pigeon_mail_backend.model.Email;
import com.example.pigeon_mail_backend.model.FilterCriteria;
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

    public List<Email> fetchEmailsFiltered(String userEmail, FilterCriteria criteria) {

        List<Email> emails = fetchEmailsByFolder(userEmail, "inbox");
        emails.addAll(fetchEmailsByFolder(userEmail, "sent"));
        emails.addAll(fetchEmailsByFolder(userEmail, "draft"));

        FilterEmailsService filterEmailsService = new FilterEmailsService();
        emails = filterEmailsService.filterEmails(emails, criteria);
        return emails;
    }
    
}
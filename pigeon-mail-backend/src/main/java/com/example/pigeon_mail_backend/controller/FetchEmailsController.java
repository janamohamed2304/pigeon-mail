package com.example.pigeon_mail_backend.controller;

import com.example.pigeon_mail_backend.model.Email;
import com.example.pigeon_mail_backend.model.FilterCriteria;
import com.example.pigeon_mail_backend.service.FetchEmailsService;

import lombok.RequiredArgsConstructor;



import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/emails")
@RequiredArgsConstructor
public class FetchEmailsController {
    
    private final FetchEmailsService fetchEmailsService;
    
    
    @GetMapping("/{folder}")
    public List<Email> getEmails(@PathVariable String folder,Authentication authentication) {
        return fetchEmailsService.fetchEmailsByFolder(authentication.getName(), folder);
    }
    @GetMapping("/filter")
    public List<Email> getEmailsFiltered(Authentication authentication,FilterCriteria criteria) {
        return fetchEmailsService.fetchEmailsFiltered(authentication.getName(), criteria);
    }
}
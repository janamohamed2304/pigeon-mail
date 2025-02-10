package com.example.pigeon_mail_backend.service;

import com.example.pigeon_mail_backend.model.Email;
import com.example.pigeon_mail_backend.model.FilterCriteria;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;


interface Criterion {
    List<Email> meetCriteria(List<Email> emails);
}

class SubjectCriterion implements Criterion {
    private final String subject;

    public SubjectCriterion(String subject) {
        this.subject = subject;
    }

    @Override
    public List<Email> meetCriteria(List<Email> emails) {
        return emails.stream()
                    .filter(email -> email.getSubject().toLowerCase()
                                        .contains(subject.toLowerCase()))
                    .collect(Collectors.toList());
    }
}

class MessageWordsCriterion implements Criterion {
    private final String includeWords;

    public MessageWordsCriterion(String includeWords) {
        this.includeWords = includeWords;
    }

    @Override
    public List<Email> meetCriteria(List<Email> emails) {
        return emails.stream()
                    .filter(email -> email.getMessage().toLowerCase()
                                        .contains(includeWords.toLowerCase()))
                    .collect(Collectors.toList());
    }
}

class PriorityCriterion implements Criterion {
    private final FilterCriteria.Priority priority;

    public PriorityCriterion(FilterCriteria.Priority priority) {
        this.priority = priority;
    }

    @Override
    public List<Email> meetCriteria(List<Email> emails) {
        return emails.stream()
                    .filter(email -> email.getPriority()
                                        .equalsIgnoreCase(priority.toString()))
                    .collect(Collectors.toList());
    }
}


class SendersCriterion implements Criterion {
    private final List<String> senders;
    public SendersCriterion(List<String> senders)
    {         this.senders = senders;     }
    @Override
    public List<Email> meetCriteria(List<Email> emails) {
        return emails.stream()
        .filter(email -> email.getFromEmail() != null &&
                            senders.stream().anyMatch(sender -> sender.equalsIgnoreCase(email.getFromEmail())))
        .collect(Collectors.toList());
    }
}


class ReceiversCriterion implements Criterion {
    private final List<String> receivers;

    public ReceiversCriterion(List<String> receivers) {
        this.receivers = receivers;
    }

    @Override
    public List<Email> meetCriteria(List<Email> emails) {
        return emails.stream()
                    .filter(email -> email.getTo().stream()
                                        .anyMatch(receiver ->
                                            receivers.stream()
                                                    .anyMatch(r ->
                                                        r.equalsIgnoreCase(receiver))))
                    .collect(Collectors.toList());
    }
}

class DateWithinCriterion implements Criterion {
    private final String dateWithin;
    private final LocalDateTime cutoffDate;

    public DateWithinCriterion(String dateWithin) {
        this.dateWithin = dateWithin;
        this.cutoffDate = calculateCutoffDate(dateWithin);
    }

    @Override
    public List<Email> meetCriteria(List<Email> emails) {
        return emails.stream()
                    .filter(email -> email.getSentAt().isAfter(cutoffDate))
                    .collect(Collectors.toList());
    }

    private LocalDateTime calculateCutoffDate(String dateWithin) {
        return switch (dateWithin.toLowerCase()) {
            case "1 day" -> LocalDateTime.now().minus(1, ChronoUnit.DAYS);
            case "1 week" -> LocalDateTime.now().minus(1, ChronoUnit.WEEKS);
            case "1 month" -> LocalDateTime.now().minus(1, ChronoUnit.MONTHS);
            default -> throw new IllegalArgumentException("Invalid date range: " + dateWithin);
        };
    }
}

public class FilterEmailsService {
    public List<Email> filterEmails(List<Email> emails, FilterCriteria criteria) {
        if (criteria == null || emails == null) {
            return emails;
        }

        List<Email> filteredEmails = new ArrayList<>(emails);
        
        if (criteria.getSubject() != null && !criteria.getSubject().isEmpty()) {
            filteredEmails = new SubjectCriterion(criteria.getSubject())
                                .meetCriteria(filteredEmails);
        }
        
        if (criteria.getIncludeWords() != null && !criteria.getIncludeWords().isEmpty()) {
            filteredEmails = new MessageWordsCriterion(criteria.getIncludeWords())
                                .meetCriteria(filteredEmails);
        }
        
        if (criteria.getPriority() != null) {
            filteredEmails = new PriorityCriterion(criteria.getPriority())
                                .meetCriteria(filteredEmails);
        }
        
        if (criteria.getSenders() != null && !criteria.getSenders().isEmpty()) {
            filteredEmails = new SendersCriterion(criteria.getSenders())
                                .meetCriteria(filteredEmails);
        }
        
        if (criteria.getReceivers() != null && !criteria.getReceivers().isEmpty()) {
            filteredEmails = new ReceiversCriterion(criteria.getReceivers())
                                .meetCriteria(filteredEmails);
        }

        if (criteria.getDate() != null && !criteria.getDate().isEmpty()) {
            filteredEmails = new DateWithinCriterion(criteria.getDate())
                                .meetCriteria(filteredEmails);
        }

        return filteredEmails;
    }
}
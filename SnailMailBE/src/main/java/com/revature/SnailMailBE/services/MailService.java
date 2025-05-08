package com.revature.SnailMailBE.services;

import com.revature.SnailMailBE.model.Mail;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class MailService {
    private List<Mail> inbox = List.of(
                new Mail("snail@snailmail.com", "yanbd@snailmail.com", "Hey", "I am a snail"),
                new Mail("snail@snailmail.com", "yanbd@snailmail.com", "Hey", "I have a shell"),
                new Mail("slug@snailmail.com", "yanbd@snailmail.com", "Hey", "I am a slug"),
                new Mail("clam@snailmail.com", "yanbd@snailmail.com", "Hey", "...")
        );

    public List<Mail> getInbox() {
        if (inbox == null){
            return null;
        } else {
            return inbox;
        }
    }


    public Mail sendMail (Mail mail){
        if (mail.getRecipient() == null || mail.getRecipient().isBlank()) {
            throw new IllegalArgumentException("Recipient cannot be empty");
        }
        if (mail.getBody() == null || mail.getBody().isBlank()) {
            throw new IllegalArgumentException("Body cannot be empty");
        }
        if (mail.getSubject() == null || mail.getSubject().isBlank()){
            throw new IllegalArgumentException("Subject cannot be empty");
        }
        if (Objects.equals(mail.getSender(), mail.getRecipient())){
            throw new IllegalArgumentException("You cannot send an email to yourself");
        }
        if (mail.getSubject().length() > 20){
            throw new IllegalArgumentException("Subject may not exceed 20 characters");
        }
        if (!mail.getRecipient().contains("@") || !mail.getRecipient().contains(".com")){
            throw new IllegalArgumentException("Please enter a valid email address");
        }

        System.out.println("new email sent");
        return mail;
    }
}

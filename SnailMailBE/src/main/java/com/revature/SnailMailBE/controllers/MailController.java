package com.revature.SnailMailBE.controllers;

import com.revature.SnailMailBE.model.Mail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mail")
@CrossOrigin

public class MailController {
    @GetMapping
    public ResponseEntity<List<Mail>> getInbox(){
        List<Mail> inbox = List.of(
                new Mail("snail@snailmail.com","me@snailmail.com" , "Hey", "I am a snail"),
                new Mail("snail@snailmail.com","me@snailmail.com" ,"Hey" , "I have a shell"),
                new Mail("slug@snailmail.com","me@snailmail.com" , "Hey", "I am a slug"),
                new Mail("clam@snailmail.com","me@snailmail.com" , "Hey", "...")
        );
        return ResponseEntity.ok().body(inbox);
    }

    @PostMapping
    public ResponseEntity<Mail> sendMail(@RequestBody Mail mail) {
        if(mail.getRecipient() == null || mail.getRecipient().isBlank()){
            return ResponseEntity.badRequest().body(null);
        }

        return ResponseEntity.ok().body(mail);
    }
}
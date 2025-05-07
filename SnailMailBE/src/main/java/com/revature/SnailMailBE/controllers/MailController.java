package com.revature.SnailMailBE.controllers;

import com.revature.SnailMailBE.model.Mail;
import com.revature.SnailMailBE.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mail")
@CrossOrigin

public class MailController {
    private MailService mailService;

    @Autowired
    public MailController(MailService mailService){
        this.mailService = mailService;
    }

    @GetMapping
    public ResponseEntity<List<Mail>> getInbox(){
        List<Mail> inbox = mailService.getInbox();

        if (inbox == null){
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok().body(inbox);
        }
    }

    @PostMapping
    public ResponseEntity<Mail> sendMail(@RequestBody Mail mail) {
        return ResponseEntity.ok().body(mailService.sendMail(mail));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Exception> handleException(Exception e) {
        return ResponseEntity.badRequest().body(e);
    }
}
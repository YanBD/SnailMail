package com.revature.SnailMailBE.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection="mail")
public class Mail {
    @MongoId
    private String mailId;

    private String sender;
    private String subject;
    private String recipient;
    private String body;

    public Mail() {}

    //All args constructor
    public Mail(String mailId, String sender, String subject, String recipient, String body) {
        this.mailId = mailId;
        this.sender = sender;
        this.subject = subject;
        this.recipient = recipient;
        this.body = body;
    }

    public Mail(String sender, String recipient, String subject, String body) {
        this.sender = sender;
        this.recipient = recipient;
        this.subject = subject;
        this.body =  body;
    }

    public String getMailId() {return mailId;}

    public void setMailId(String mailId) {this.mailId = mailId;}

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    @Override
    public String toString() {
        return "Mail{" +
                "mailId='" + mailId + '\'' +
                "sender='" + sender + '\'' +
                ", recipient='" + recipient + '\'' +
                ", subject='" + subject + '\'' +
                ", body='" + body + '\'' +
                '}';
    }
}
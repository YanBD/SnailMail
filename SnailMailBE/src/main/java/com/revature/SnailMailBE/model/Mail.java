package com.revature.SnailMailBE.model;


public class Mail {
    private String sender;
    private String subject;
    private String recipient;
    private String body;

    public Mail() {}

    public Mail(String sender, String subject, String recipient, String body) {
        this.sender = sender;
        this.recipient = recipient;
        this.subject = subject;
        this.body =  body;
    }

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
                "sender='" + sender + '\'' +
                ", recipient='" + recipient + '\'' +
                ", subject='" + subject + '\'' +
                ", body='" + body + '\'' +
                '}';
    }
}
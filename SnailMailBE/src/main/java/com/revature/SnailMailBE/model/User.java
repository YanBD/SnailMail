package com.revature.SnailMailBE.model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.MongoId;

public class User {

    //fields
    @MongoId
    private ObjectId userID;

    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String role;

    public User() {
        this.role = "user";
    }

    public User(ObjectId userID, String username, String password, String firstName, String lastName, String role) {
        this.userID = userID;
        this.username = username;
        this.email  = username + "@snailmail.com";
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role != null ? role : "user";
    }

    public User( String username, String password, String firstName, String lastName, String role) {
        this.username = username;
        this.email  = username + "@snailmail.com";
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role != null ? role : "user";
    }

    public ObjectId getUserID() {
        return userID;
    }

    public void setUserID(ObjectId userID) {
        this.userID = userID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String username) {
        this.username = username;
        this.email = username + "@snailmail.com";
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "User{" +
                "userID='" + userID + '\'' +
                "username='" + username + '\'' +
                "password='" + password + '\'' +
                "firstName='" + firstName + '\'' +
                "lastName='" + lastName + '\'' +
                "role='" + role + '\'' +
                '}';

    }
}

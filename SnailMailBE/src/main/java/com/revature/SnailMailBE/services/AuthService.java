package com.revature.SnailMailBE.services;

import com.revature.SnailMailBE.model.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Objects;

@Service
public class AuthService {
    public List<User> users = List.of(
            new User("0", "yanbd", "password", "bryan", "yancey","admin"),
            new User("1", "snail", "password", "Snail", "hard","user"),
            new User("2", "mail", "password", "mail", "coded","user")
    );

    public User logInUser(@RequestBody User newUser, HttpSession session) {
        //iterates through list of hardcoded users to compare username and password
        for (User user : users) {
            if (Objects.equals(user.getUsername(), newUser.getUsername()) && Objects.equals(user.getPassword(), newUser.getPassword())) {
                session.setAttribute("user", user);
                return user;
            }
        }
        //if no match is found, throw an exception
        throw new IllegalArgumentException("Invalid username or password");
    }
}

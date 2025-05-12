package com.revature.SnailMailBE.services;

import com.revature.SnailMailBE.model.PasswordDTO;
import com.revature.SnailMailBE.model.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class AuthService {
    public List<User> users = new ArrayList<User> (Arrays.asList(
            new User("0", "yanbd", "password", "bryan", "yancey","admin"),
            new User("1", "snail", "password", "Snail", "hard","user"),
            new User("2", "mail", "password", "mail", "coded","user")
    ));

    public User logInUser(@RequestBody User newUser, HttpSession session) {
        //iterates through list of hardcoded users to compare username and password

        for (User user : users) {
            if (Objects.equals(user.getUsername(), newUser.getUsername())
                    && Objects.equals(user.getPassword(), newUser.getPassword())) {
                session.setAttribute("user", user);
                return user;

            }
        }
        //if no match is found, throw an exception
        throw new IllegalArgumentException("Invalid username or password");
    }

    public void addUser(User newUser) {
        //adds a new user to the list
        newUser.setUserID(String.valueOf(users.size()));
        newUser.setRole("user");
        newUser.setEmail(newUser.getUsername());

        for (User user : users) {
            if (Objects.equals(user.getUsername(), newUser.getUsername())){
                throw new IllegalArgumentException("Username already exists");
            }

        }
        users.add(newUser);

    }

    public void changePassword(PasswordDTO passwordDTO) {
        //iterates through the list of Users to find user and old password combo
        for (User user : users) {
            if (Objects.equals(user.getUsername(), passwordDTO.getUsername())
                    && (Objects.equals(user.getPassword(), passwordDTO.getOldPassword()))) {
                //if found, set the new password
                if (Objects.equals(passwordDTO.getOldPassword(), passwordDTO.getNewPassword())) {
                    throw new IllegalArgumentException("New password cannot be the same as current password");
                } else {
                    user.setPassword(passwordDTO.getNewPassword());
                    return;
                }
            }
        } throw new IllegalArgumentException("Current password is incorrect");
    }
}

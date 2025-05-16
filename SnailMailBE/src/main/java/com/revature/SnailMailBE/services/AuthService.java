package com.revature.SnailMailBE.services;

import com.revature.SnailMailBE.daos.UserDAO;
import com.revature.SnailMailBE.model.PasswordDTO;
import com.revature.SnailMailBE.model.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

//import java.util.ArrayList;
//import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class AuthService {
//   public List<User> users = new ArrayList<User> (Arrays.asList(
//            new User("yanbd", "passwo", "bryan", "yancey","admin"),
//           new User("snail", "passwor", "Snail", "hard","user"),
//            new User("mail", "password", "mail", "coded","user")
//    ));

    private UserDAO userDAO;

    public AuthService(UserDAO userDAO) {
        this.userDAO = userDAO;
        users = userDAO.findAll();

    }

    private List<User> users;

    public User logInUser(@RequestBody User newUser, HttpSession session) {
        //finds username from database
        User user = userDAO.findByUsername(newUser.getUsername())
                .orElseThrow(() ->new IllegalArgumentException("Invalid Username"));

        //verify password
        if (!Objects.equals(user.getPassword(), newUser.getPassword())) {
            throw new IllegalArgumentException("Invalid password");
        }
        System.out.println(user.getUserID());
        session.setAttribute("userId", user.getUserID());
        return user;
    }

    public void addUser(User newUser) {
        //sets user role and email
        if (newUser.getRole() == null || newUser.getRole().isEmpty()) {
            newUser.setRole("user");
        }
        if (newUser.getEmail() == null || newUser.getEmail().isEmpty()) {
            newUser.setEmail(newUser.getUsername());
        }

        //iterates over database to ensure username is unique
       if (userDAO.findByUsername(newUser.getUsername()).isPresent()) {
           throw new IllegalArgumentException("Username already Exists");
       }


        userDAO.save(newUser);

    }

    public void changePassword(PasswordDTO passwordDTO) {
        //find the user by username
        User user = userDAO.findByUsername(passwordDTO.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("User not Found"));

        //Verify current password
        if (!Objects.equals(user.getPassword(), passwordDTO.getOldPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        if (Objects.equals(user.getPassword(), passwordDTO.getNewPassword())) {
            throw new IllegalArgumentException("Can not use current password");
        }

        user.setPassword(passwordDTO.getNewPassword());
        userDAO.save(user);
    }

}

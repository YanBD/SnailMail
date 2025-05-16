package com.revature.SnailMailBE.controllers;

import com.revature.SnailMailBE.model.User;
import com.revature.SnailMailBE.services.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.getAllUsers();
        try {
            return ResponseEntity.ok().body(users);
        } catch (Exception e) {
            throw e;
        }
    }

    @PatchMapping("/profile")
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        try {
            userService.changeUserInfo(user);
            return ResponseEntity.ok().body(user);
        } catch (Exception e) {
            throw e;
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Exception> handleException(Exception e) {
        return ResponseEntity.badRequest().body(e);
    }
}

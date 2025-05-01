package com.revature.SnailMailBE.controllers;

import com.revature.SnailMailBE.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    @GetMapping
    public ResponseEntity<List<User>> getUserList (){
            List<User> userList = List.of(
                    new User("0", "yanbd", "password", "bryan", "yancey","admin"),
                    new User("1", "snail", "password", "Snail", "hard","user"),
                    new User("2", "mail", "password", "mail", "coded","user")
            );
    return ResponseEntity.ok().body(userList);
    }

}

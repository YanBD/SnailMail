package com.revature.SnailMailBE.controllers;

import com.revature.SnailMailBE.model.PasswordDTO;
import com.revature.SnailMailBE.model.User;
import com.revature.SnailMailBE.services.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {
    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> logInUser(@RequestBody User user, HttpSession session){
            return ResponseEntity.ok().body(authService.logInUser(user, session));

    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        authService.addUser(user);
        return ResponseEntity.ok().body(user);
    }

    @PatchMapping
    public ResponseEntity<?> changePassword(@RequestBody PasswordDTO passwordDTO) {
        authService.changePassword(passwordDTO);
        return ResponseEntity.ok().body("Password Changed");
    }

    @ExceptionHandler (Exception.class)
    public ResponseEntity<Exception> handleException(Exception e){
        return ResponseEntity.badRequest().body(e);
    }

}

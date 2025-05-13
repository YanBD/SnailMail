package com.revature.SnailMailBE.services;

import com.revature.SnailMailBE.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserService {
    // Using Authservice list of users to prevent redundancy
    private AuthService authService;

    public UserService(AuthService authService) {
        this.authService = authService;
    }

    public List<User> getAllUsers() {
        return authService.getUsers();
    }

    public User changeUserInfo(User updateUser){
        for (User user: getAllUsers()) {
            if (!Objects.equals(user.getUserID(), updateUser.getUserID())
                    && Objects.equals(user.getUsername(), updateUser.getUsername())) {
                throw new IllegalArgumentException("Username already exist");
            }
            if (Objects.equals(user.getUserID(), updateUser.getUserID())) {
                if (!Objects.equals(user.getPassword(), updateUser.getPassword())) {
                    throw new IllegalArgumentException("User Password does not match");

                }
                user.setUsername(updateUser.getUsername());
                user.setEmail(updateUser.getUsername());
                user.setFirstName(updateUser.getFirstName());
                user.setLastName(updateUser.getLastName());
                user.setRole(updateUser.getRole());

                System.out.println(updateUser.getEmail());
                System.out.println(updateUser.getPassword());
                return user;
            }
        }

        throw new IllegalArgumentException("User ID does not exist");

    }
}

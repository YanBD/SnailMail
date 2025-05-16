package com.revature.SnailMailBE.services;

import com.revature.SnailMailBE.daos.UserDAO;
import com.revature.SnailMailBE.model.User;
import jakarta.servlet.http.HttpSession;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
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

    private UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
        users = userDAO.findAll();
    }

    private List<User> users;

    public User changeUserInfo(User updateUser){
        //find user by userid
        System.out.println(updateUser.getUserID());
        User user = userDAO.findByUserID(updateUser.getUserID())
                .orElseThrow(() -> new IllegalArgumentException("User not Found"));

        // verify unique username except User being edited
        if (userDAO.findByUsername(updateUser.getUsername()).isPresent()
                && !Objects.equals(user.getUserID(), updateUser.getUserID())) {
            throw new IllegalArgumentException("Username already exist");
        }

        //verify password of user
        if (!Objects.equals(user.getPassword(), updateUser.getPassword())){
            throw new IllegalArgumentException("User Password does not match");

        }

        //update user information
        user.setUsername(updateUser.getUsername());
        user.setFirstName(updateUser.getFirstName());
        user.setLastName(updateUser.getLastName());
        user.setRole(updateUser.getRole());

        //return user
        return userDAO.save(user);



    }

    public List<User> getAllUsers() {
        if (users.isEmpty()){
            return null;
        }
        return users;
    }
}

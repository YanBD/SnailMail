package com.revature.SnailMailBE.daos;

import com.revature.SnailMailBE.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository //repository bean to annotate interface
public interface UserDAO extends MongoRepository<User, ObjectId> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    Optional<User> findByUserID(String userID);
}

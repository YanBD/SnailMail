package com.revature.SnailMailBE.daos;

import com.revature.SnailMailBE.model.Mail;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

//Lets us Access built in CRUD methods
@Repository
public interface MailDAO extends MongoRepository<Mail, String> {

}

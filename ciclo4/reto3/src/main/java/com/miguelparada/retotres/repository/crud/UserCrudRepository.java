package com.miguelparada.retotres.repository.crud;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.miguelparada.retotres.model.User;

/**
 * 
 * @author MiguelParada
 */
public interface UserCrudRepository extends MongoRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndPassword(String email, String password);

}

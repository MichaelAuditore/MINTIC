package com.miguelparada.retocuatro.repository.crud;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.miguelparada.retocuatro.model.User;

/**
 * 
 * @author MiguelParada
 */
public interface UserCrudRepository extends MongoRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    Optional<User> findByEmailAndPassword(String email, String password);

    @Query(" { monthBirthtDay: ?0 } ")
    List<User> getUserByMonthBirthDay(String monthBirthDay);
}

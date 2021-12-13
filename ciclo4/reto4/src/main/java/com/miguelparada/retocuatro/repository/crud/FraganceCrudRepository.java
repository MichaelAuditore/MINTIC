package com.miguelparada.retocuatro.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.miguelparada.retocuatro.model.Fragance;

/**
 * 
 * @author MiguelParada
 */
public interface FraganceCrudRepository extends MongoRepository<Fragance, String> {

}

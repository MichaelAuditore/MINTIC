package com.miguelparada.retodos.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.miguelparada.retodos.model.Fragance;

/**
 * 
 * @author MiguelParada
 */
public interface FraganceCrudRepository extends MongoRepository<Fragance, String> {

}

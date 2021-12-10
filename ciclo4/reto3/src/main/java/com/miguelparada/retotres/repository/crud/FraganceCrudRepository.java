package com.miguelparada.retotres.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.miguelparada.retotres.model.Fragance;

/**
 * 
 * @author MiguelParada
 */
public interface FraganceCrudRepository extends MongoRepository<Fragance, String> {

}

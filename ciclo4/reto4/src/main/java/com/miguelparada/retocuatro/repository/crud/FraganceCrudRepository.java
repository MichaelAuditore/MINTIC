package com.miguelparada.retocuatro.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

import com.miguelparada.retocuatro.model.Fragance;

/**
 * 
 * @author MiguelParada
 */
public interface FraganceCrudRepository extends MongoRepository<Fragance, String> {

    @Query(" { price: ?0 } ")
    List<Fragance> getFragancesByPrice(double price);

    @Query(" { description: { $regex: ?0 } } ")
    List<Fragance> getFragancesByDescription(String word);
}

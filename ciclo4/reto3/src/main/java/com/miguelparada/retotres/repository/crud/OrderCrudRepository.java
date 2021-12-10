package com.miguelparada.retotres.repository.crud;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

import com.miguelparada.retotres.model.Order;

/**
 * 
 * @author MiguelParada
 */
public interface OrderCrudRepository extends MongoRepository<Order, Integer> {
    @Query("{ 'salesMan.zone' :  ?0}")
    List<Order> findBySalesManZone(String zone);
}

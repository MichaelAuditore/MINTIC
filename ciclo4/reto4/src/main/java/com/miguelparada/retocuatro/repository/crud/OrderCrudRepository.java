package com.miguelparada.retocuatro.repository.crud;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

import com.miguelparada.retocuatro.model.Order;

/**
 * 
 * @author MiguelParada
 */
public interface OrderCrudRepository extends MongoRepository<Order, Integer> {
    @Query("{ 'salesMan.zone' :  ?0}")
    List<Order> findBySalesManZone(String zone);

    @Query("{ 'salesMan.id': ?0  }")
    List<Order> findBySalesMan(int salesMan);

    @Query("{ 'status': ?0, 'salesMan.id': ?1  }")
    List<Order> getOrdersByStateAndSalesMan(String status, int idSalesman);
}

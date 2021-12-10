package com.miguelparada.retotres.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.miguelparada.retotres.model.Order;
import com.miguelparada.retotres.repository.crud.OrderCrudRepository;

/**
 * 
 * @author MiguelParada
 */
@Repository
public class OrderRepository {
    @Autowired
    private OrderCrudRepository orderCrudRepository;

    public List<Order> getAll() {
        return orderCrudRepository.findAll();
    }

    public Optional<Order> getOrder(int idOrder) {
        return orderCrudRepository.findById(idOrder);
    }

    public List<Order> getOrderBySalesManZone(String zone) {
        return orderCrudRepository.findBySalesManZone(zone);
    }

    public Order create(Order order) {
        return orderCrudRepository.save(order);
    }

    public void update(Order order) {
        orderCrudRepository.save(order);
    }

    public void delete(Order order) {
        orderCrudRepository.delete(order);
    }

}

package com.miguelparada.retocuatro.repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.miguelparada.retocuatro.model.Order;
import com.miguelparada.retocuatro.repository.crud.OrderCrudRepository;

/**
 * 
 * @author MiguelParada
 */
@Repository
public class OrderRepository {
    @Autowired
    private OrderCrudRepository orderCrudRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public int getLastOrderId() {
        int lastId = 0;
        List<Order> orders = getAll();
        for (Order order : orders) {
            lastId = order.getId();
        }
        return lastId;
    }

    public List<Order> getAll() {
        return orderCrudRepository.findAll();
    }

    public Optional<Order> getOrder(int idOrder) {
        return orderCrudRepository.findById(idOrder);
    }

    public List<Order> getOrderBySalesManZone(String zone) {
        return orderCrudRepository.findBySalesManZone(zone);
    }

    public List<Order> getOrderBySalesMan(int idSalesman) {
        return orderCrudRepository.findBySalesMan(idSalesman);
    }

    public List<Order> getOrdersByStateAndSalesMan(String status, int idSalesman) {
        return orderCrudRepository.getOrdersByStateAndSalesMan(status, idSalesman);
    }

    public List<Order> getOrdersByRegisterDateAndSalesMan(String date, int idSalesman) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        Query query = new Query();
        Criteria dateCriteria = Criteria.where("registerDay")
                .gte(LocalDate.parse(date, formatter).minusDays(1).atStartOfDay())
                .lt(LocalDate.parse(date, formatter).plusDays(2).atStartOfDay())
                .and("salesMan.id").is(idSalesman);

        query.addCriteria(dateCriteria);
        List<Order> orders = mongoTemplate.find(query, Order.class);

        return orders;
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

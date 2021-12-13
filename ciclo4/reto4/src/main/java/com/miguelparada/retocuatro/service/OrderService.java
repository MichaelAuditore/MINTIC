package com.miguelparada.retocuatro.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.miguelparada.retocuatro.model.Order;
import com.miguelparada.retocuatro.repository.OrderRepository;

/**
 * 
 * @author MiguelParada
 */
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAll() {
        return orderRepository.getAll();
    }

    public Optional<Order> getOrder(Integer idOrder) {
        return orderRepository.getOrder(idOrder);
    }

    public List<Order> getOrderBySalesManZone(String zone) {
        return orderRepository.getOrderBySalesManZone(zone);
    }

    public Order create(Order order) {
        if (order.getId() == null) {
            int orderId = orderRepository.getLastOrderId();
            order.setId(orderId + 1);
            return orderRepository.create(order);
        } else {
            return orderRepository.create(order);
        }
    }

    public Order update(Order order) {

        if (order.getId() != null) {
            Optional<Order> orderDb = orderRepository.getOrder(order.getId());
            if (!orderDb.isEmpty()) {

                if (order.getRegisterDay() != null) {
                    orderDb.get().setRegisterDay(order.getRegisterDay());
                }

                if (order.getStatus() != null) {
                    orderDb.get().setStatus(order.getStatus());
                }

                if (order.getSalesMan() != null) {
                    orderDb.get().setSalesMan(order.getSalesMan());
                }

                if (order.getProducts() != null) {
                    orderDb.get().setProducts(order.getProducts());
                }
                if (order.getQuantities() != null) {
                    orderDb.get().setQuantities(order.getQuantities());
                }

                orderRepository.update(orderDb.get());
                return orderDb.get();
            } else {
                return order;
            }
        } else {
            return order;
        }
    }

    public boolean delete(Integer idOrder) {
        Boolean aBoolean = getOrder(idOrder).map(order -> {
            orderRepository.delete(order);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}

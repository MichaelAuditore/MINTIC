package com.miguelparada.retocuatro.web;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.miguelparada.retocuatro.model.Order;
import com.miguelparada.retocuatro.service.OrderService;

/**
 * 
 * @author MiguelParada
 */
@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public List<Order> getAll() {
        return orderService.getAll();
    }

    @GetMapping("/{idOrder}")
    public Optional<Order> getOrder(@PathVariable("idOrder") Integer idOrder) {
        return orderService.getOrder(idOrder);
    }

    @GetMapping("zona/{ZONE}")
    public List<Order> getOrderBySalesManZone(@PathVariable("ZONE") String zone) {
        return orderService.getOrderBySalesManZone(zone);
    }

    @GetMapping("salesman/{idSalesman}")
    public List<Order> getOrderBySalesMan(@PathVariable("idSalesman") int idSalesman) {
        return orderService.getOrderBySalesMan(idSalesman);
    }

    @GetMapping("state/{status}/{idSalesman}")
    public List<Order> getOrdersByStateAndSalesMan(
            @PathVariable("status") String status,
            @PathVariable("idSalesman") int idSalesman) {
        return orderService.getOrdersByStateAndSalesMan(status, idSalesman);
    }

    @GetMapping("date/{dateString}/{idSalesman}")
    public List<Order> getOrdersByRegisterDateAndSalesMan(
            @PathVariable("dateString") Date date,
            @PathVariable("idSalesman") int idSalesman) {
        return orderService.getOrdersByRegisterDateAndSalesMan(date, idSalesman);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Order create(@RequestBody Order order) {
        return orderService.create(order);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Order update(@RequestBody Order order) {
        return orderService.update(order);
    }

    @DeleteMapping("/{idOrder}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("idOrder") Integer idOrder) {
        return orderService.delete(idOrder);
    }

}

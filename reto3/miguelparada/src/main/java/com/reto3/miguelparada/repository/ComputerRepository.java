package com.reto3.miguelparada.repository;

import java.util.List;

import com.reto3.miguelparada.model.Computer;
import com.reto3.miguelparada.repository.crud.ComputerCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ComputerRepository {

    @Autowired
    private ComputerCrudRepository computerCrudRepository;

    public List<Computer> getAll() {
        return (List<Computer>) computerCrudRepository.findAll();
    }

    public Computer getById(int id) {
        return computerCrudRepository.findById(id).orElse(null);
    }

    public Computer saveComputer(Computer computer) {
        return computerCrudRepository.save(computer);
    }

}

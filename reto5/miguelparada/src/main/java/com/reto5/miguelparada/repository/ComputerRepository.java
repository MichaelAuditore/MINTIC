package com.reto5.miguelparada.repository;

import java.util.List;

import com.reto5.miguelparada.model.Computer;
import com.reto5.miguelparada.repository.crud.ComputerCrudRepository;

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

    public void deleteComputer(int computerId) {
        computerCrudRepository.deleteById(computerId);
    }

}

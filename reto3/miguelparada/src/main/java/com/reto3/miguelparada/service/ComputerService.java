package com.reto3.miguelparada.service;

import java.util.List;

import com.reto3.miguelparada.model.Computer;
import com.reto3.miguelparada.repository.ComputerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComputerService {

    @Autowired
    private ComputerRepository computerRepository;

    public List<Computer> getAllComputers() {
        return computerRepository.getAll();
    }

    public Computer saveComputer(Computer computer) {
        return computerRepository.saveComputer(computer);
    }

}

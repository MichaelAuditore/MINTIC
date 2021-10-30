package com.reto5.miguelparada.service;

import java.util.List;

import com.reto5.miguelparada.model.Computer;
import com.reto5.miguelparada.repository.ComputerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ComputerService {

    @Autowired
    private ComputerRepository computerRepository;

    public List<Computer> getAllComputers() {
        return computerRepository.getAll();
    }

    public Computer getComputerById(int id) {
        return computerRepository.getById(id);
    }

    public Computer saveComputer(Computer computer) {
        if (computer.getId() == null) {
            return computerRepository.saveComputer(computer);
        } else {
            Computer getComputer = computerRepository.getById(computer.getId());
            if (getComputer != null) {
                return getComputer;
            } else {
                return computerRepository.saveComputer(computer);
            }
        }
    }

    public Computer updateComputer(Computer computer) {
        if (computer.getId() != null) {
            Computer computerToUpdate = computerRepository.getById(computer.getId());
            if (computerToUpdate != null) {
                if (computer.getBrand() != null) {
                    computerToUpdate.setBrand(computer.getBrand());
                }
                if (computer.getName() != null) {
                    computerToUpdate.setName(computer.getName());
                }
                if (computer.getDescription() != null) {
                    computerToUpdate.setDescription(computer.getDescription());
                }
                if (computer.getYear() != null) {
                    computerToUpdate.setYear(computer.getYear());
                }
                return computerRepository.saveComputer(computerToUpdate);
            }
        }
        return computerRepository.saveComputer(computer);
    }

    public void deleteComputer(int computerId) {
        computerRepository.deleteComputer(computerId);
    }

}

package com.reto4.miguelparada.web;

import java.util.List;

import com.reto4.miguelparada.model.Computer;
import com.reto4.miguelparada.service.ComputerService;

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

@RestController
@RequestMapping("api/Computer")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class ComputerController {

    @Autowired
    private ComputerService computerService;

    @GetMapping("/all")
    public List<Computer> getComputers() {
        return computerService.getAllComputers();
    }

    @GetMapping("/{id}")
    public Computer getComputer(@PathVariable("id") int computerId) {
        return computerService.getComputerById(computerId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveComputer(@RequestBody Computer computer) {
        computerService.saveComputer(computer);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateComputer(@RequestBody Computer computer) {
        computerService.updateComputer(computer);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteClient(@PathVariable("id") int computerId) {
        computerService.deleteComputer(computerId);
    }
}

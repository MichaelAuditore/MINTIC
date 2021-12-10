package com.miguelparada.retotres.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.miguelparada.retotres.model.Fragance;
import com.miguelparada.retotres.repository.crud.FraganceCrudRepository;

/**
 * 
 * @author MiguelParada
 */
@Repository
public class FraganceRepository {
    @Autowired
    private FraganceCrudRepository fraganceCrudRepository;

    public List<Fragance> getAll() {
        return fraganceCrudRepository.findAll();
    }

    public Optional<Fragance> getFragance(String reference) {
        return fraganceCrudRepository.findById(reference);
    }

    public Fragance create(Fragance fragance) {
        return fraganceCrudRepository.save(fragance);
    }

    public void update(Fragance fragance) {
        fraganceCrudRepository.save(fragance);
    }

    public void delete(Fragance fragance) {
        fraganceCrudRepository.delete(fragance);
    }

}

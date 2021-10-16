package com.reto3.miguelparada.repository;

import java.util.List;

import com.reto3.miguelparada.model.Client;
import com.reto3.miguelparada.repository.crud.ClientCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ClientRepository {

    @Autowired
    private ClientCrudRepository clientCrudRepository;

    public List<Client> getAll() {
        return (List<Client>) clientCrudRepository.findAll();
    }

    public Client getById(int id) {
        return clientCrudRepository.findById(id).orElse(null);
    }

    public Client saveClient(Client client) {
        return clientCrudRepository.save(client);
    }

}

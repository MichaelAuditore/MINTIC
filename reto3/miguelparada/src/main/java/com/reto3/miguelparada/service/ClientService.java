package com.reto3.miguelparada.service;

import java.util.List;

import com.reto3.miguelparada.model.Client;
import com.reto3.miguelparada.repository.ClientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAllClients() {
        return clientRepository.getAll();
    }

    public Client saveClient(Client client) {
        if (client.getIdClient() == null) {
            return clientRepository.saveClient(client);
        } else {
            Client getClient = clientRepository.getById(client.getIdClient());
            if (getClient != null) {
                return getClient;
            } else {
                return clientRepository.saveClient(client);
            }
        }
    }

}

package com.reto4.miguelparada.service;

import java.util.List;

import com.reto4.miguelparada.model.Client;
import com.reto4.miguelparada.repository.ClientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAllClients() {
        return clientRepository.getAll();
    }

    public Client getClientById(int id) {
        return clientRepository.getById(id);
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

    public Client updateClient(Client client) {
        if (client.getIdClient() != null) {
            Client clientToUpdate = clientRepository.getById(client.getIdClient());
            if (clientToUpdate != null) {
                if (client.getName() != null) {
                    clientToUpdate.setName(client.getName());
                }
                if (client.getEmail() != null) {
                    clientToUpdate.setEmail(client.getEmail());
                }
                if (client.getPassword() != null) {
                    clientToUpdate.setPassword(client.getPassword());
                }
                if (client.getAge() != null) {
                    clientToUpdate.setAge(client.getAge());
                }
                return clientRepository.saveClient(clientToUpdate);
            }
        }
        return clientRepository.saveClient(client);
    }

    public void deleteClient(int clientId) {
        clientRepository.deleteClient(clientId);
    }
}

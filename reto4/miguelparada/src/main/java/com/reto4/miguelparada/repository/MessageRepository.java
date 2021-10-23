package com.reto4.miguelparada.repository;

import java.util.List;

import com.reto4.miguelparada.model.Message;
import com.reto4.miguelparada.repository.crud.MessageCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MessageRepository {
    @Autowired
    private MessageCrudRepository messageCrudRepository;

    public List<Message> getAll() {
        return (List<Message>) messageCrudRepository.findAll();
    }

    public Message getById(int id) {
        return messageCrudRepository.findById(id).orElse(null);
    }

    public Message saveMessage(Message message) {
        return messageCrudRepository.save(message);
    }

    public void deleteMessage(int messageId) {
        messageCrudRepository.deleteById(messageId);
    }
}

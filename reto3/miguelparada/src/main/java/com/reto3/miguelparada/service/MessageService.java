package com.reto3.miguelparada.service;

import java.util.List;

import com.reto3.miguelparada.model.Message;
import com.reto3.miguelparada.repository.MessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAllMessages() {
        return messageRepository.getAll();
    }

    public Message saveMessage(Message message) {
        if (message.getIdMessage() == null) {
            return messageRepository.saveMessage(message);
        } else {
            Message getMessage = messageRepository.getById(message.getIdMessage());
            if (getMessage != null) {
                return getMessage;
            } else {
                return messageRepository.saveMessage(message);
            }
        }
    }
}

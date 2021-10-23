package com.reto4.miguelparada.service;

import java.util.List;

import com.reto4.miguelparada.model.Message;
import com.reto4.miguelparada.repository.MessageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAllMessages() {
        return messageRepository.getAll();
    }

    public Message getMessageById(int id) {
        return messageRepository.getById(id);
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

    public Message updateMessage(Message message) {
        if (message.getIdMessage() != null) {
            Message messageToUpdate = messageRepository.getById(message.getIdMessage());
            if (messageToUpdate != null) {
                if (message.getMessageText() != null) {
                    messageToUpdate.setMessageText(message.getMessageText());
                }
                if (message.getClient() != null) {
                    messageToUpdate.setClient(message.getClient());
                }
                return messageRepository.saveMessage(messageToUpdate);
            }
        }
        return messageRepository.saveMessage(message);
    }

    public void deleteMessage(int messageId) {
        messageRepository.deleteMessage(messageId);
    }
}

package com.reto4.miguelparada.web;

import java.util.List;

import com.reto4.miguelparada.model.Message;
import com.reto4.miguelparada.service.MessageService;

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
@RequestMapping("api/Message")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/all")
    public List<Message> getMessages() {
        return messageService.getAllMessages();
    }

    @GetMapping("/{id}")
    public Message getMessage(@PathVariable("id") int messageId) {
        return messageService.getMessageById(messageId);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveMessage(@RequestBody Message message) {
        messageService.saveMessage(message);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateMessage(@RequestBody Message message) {
        messageService.updateMessage(message);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMessage(@PathVariable("id") int messageId) {
        messageService.deleteMessage(messageId);
    }

}

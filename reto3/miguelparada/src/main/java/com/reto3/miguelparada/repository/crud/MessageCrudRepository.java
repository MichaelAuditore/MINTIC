package com.reto3.miguelparada.repository.crud;

import com.reto3.miguelparada.model.Message;

import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message, Integer> {

}

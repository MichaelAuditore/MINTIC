package com.reto5.miguelparada.repository.crud;

import com.reto5.miguelparada.model.Message;

import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message, Integer> {

}

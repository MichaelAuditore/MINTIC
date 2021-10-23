package com.reto4.miguelparada.repository.crud;

import com.reto4.miguelparada.model.Message;

import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message, Integer> {

}

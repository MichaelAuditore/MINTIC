package com.reto3.miguelparada.repository;

import java.util.List;

import com.reto3.miguelparada.model.Category;
import com.reto3.miguelparada.repository.crud.CategoryCrudRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryRepository {

    @Autowired
    private CategoryCrudRepository categoryCrudRepository;

    public List<Category> getAll() {
        return (List<Category>) categoryCrudRepository.findAll();
    }

    public Category getById(int id) {
        return categoryCrudRepository.findById(id).orElse(null);
    }

    public Category saveCategory(Category category) {
        return categoryCrudRepository.save(category);
    }

}

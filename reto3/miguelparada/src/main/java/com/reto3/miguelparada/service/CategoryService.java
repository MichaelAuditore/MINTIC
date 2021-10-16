package com.reto3.miguelparada.service;

import java.util.List;

import com.reto3.miguelparada.model.Category;
import com.reto3.miguelparada.repository.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.getAll();
    }

    public Category getCategoryById(int id) {
        return categoryRepository.getById(id);
    }

    public Category saveCategory(Category category) {
        if (category.getId() == null) {
            return categoryRepository.saveCategory(category);
        } else {
            Category getCategory = categoryRepository.getById(category.getId());
            if (getCategory != null) {
                return getCategory;
            } else {
                return categoryRepository.saveCategory(category);
            }
        }

    }

}

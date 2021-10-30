package com.reto5.miguelparada.web;

import java.util.List;

import com.reto5.miguelparada.model.Category;
import com.reto5.miguelparada.service.CategoryService;

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
@RequestMapping("api/Category")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/all")
    public List<Category> getCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Category getCategory(@PathVariable("id") int id) {
        return categoryService.getCategoryById(id);
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public void saveCategory(@RequestBody Category category) {
        categoryService.saveCategory(category);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateCategory(@RequestBody Category category) {
        categoryService.updateCategory(category);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategory(@PathVariable("id") int categoryId) {
        categoryService.deleteCategory(categoryId);
    }
}

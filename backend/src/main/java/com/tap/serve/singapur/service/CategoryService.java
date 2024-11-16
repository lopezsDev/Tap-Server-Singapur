package com.tap.serve.singapur.service;

import com.tap.serve.singapur.model.CategoryModel;
import com.tap.serve.singapur.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryModel> findAll() {
        return categoryRepository.findAll();
    }

    public CategoryModel findById(long id) {
        return categoryRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("Categoría con el id: " + id +" no encontrada"));
    }

    public CategoryModel save(CategoryModel categoryModel) {
        return categoryRepository.save(categoryModel);
    }

    public void deleteById(long id) {
        if(!categoryRepository.existsById(id)) {
            throw new EntityNotFoundException("Categoría con el id: " + id + " no encontrada");
        }
        categoryRepository.deleteById(id);
    }
}

package com.tap.serve.singapur.service;

import com.tap.serve.singapur.dto.CategoryRequestDTO;
import com.tap.serve.singapur.dto.CategoryResponseDTO;
import com.tap.serve.singapur.mapper.CategoryMapper;
import com.tap.serve.singapur.model.CategoryModel;
import com.tap.serve.singapur.repository.CategoryRepository;
import com.tap.serve.singapur.utils.exception.CategoryNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryService(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    public List<CategoryResponseDTO> findAll() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryMapper::toDTO)
                .toList();
    }

    public CategoryResponseDTO findById(long id) {
        return categoryMapper.toDTO(
                categoryRepository.findById(id)
                        .orElseThrow(()-> new CategoryNotFoundException("Categoría "+ id +" no encontrada"))
        );
    }

    public CategoryResponseDTO create(CategoryRequestDTO categoryModel) {
        CategoryModel model = categoryMapper.toModel(categoryModel);
        return categoryMapper.toDTO(categoryRepository.save(model));
    }

    public CategoryResponseDTO update(long id, CategoryRequestDTO dto) {
     CategoryModel existing = categoryRepository.findById(id)
             .orElseThrow(()-> new CategoryNotFoundException("Categoría con el ID "+ id +" no encontrada"));
     existing.setName(dto.name());
     existing.setDescription(dto.description());
     existing.setUnitOfMeasure(dto.unitOfMeasure());

     return categoryMapper.toDTO(categoryRepository.save(existing));
    }

    public void deleteById(long id) {
        if(!categoryRepository.existsById(id)) {
            throw new CategoryNotFoundException("Categoría con el id: " + id + " no encontrada");
        }
        categoryRepository.deleteById(id);
    }
}

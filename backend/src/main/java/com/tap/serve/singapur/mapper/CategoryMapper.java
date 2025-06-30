package com.tap.serve.singapur.mapper;

import com.tap.serve.singapur.dto.CategoryRequestDTO;
import com.tap.serve.singapur.dto.CategoryResponseDTO;
import com.tap.serve.singapur.model.CategoryModel;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryResponseDTO toDTO(CategoryModel model) {
        return new CategoryResponseDTO(
                model.getId(),
                model.getName(),
                model.getDescription(),
                model.getUnitOfMeasure()
        );
    }

    public CategoryModel toModel(CategoryRequestDTO dto) {
        CategoryModel model = new CategoryModel();
        model.setName(dto.name());
        model.setDescription(dto.description());
        model.setUnitOfMeasure(dto.unitOfMeasure());
        return model;
    }
}

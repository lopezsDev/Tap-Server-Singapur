package com.tap.serve.singapur.mapper;

import com.tap.serve.singapur.dto.ProductRequestDTO;
import com.tap.serve.singapur.dto.ProductResponseDTO;
import com.tap.serve.singapur.model.CategoryModel;
import com.tap.serve.singapur.model.ProductModel;
import com.tap.serve.singapur.repository.CategoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    private final CategoryRepository categoryRepository;

    public ProductMapper(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public ProductModel toModel(ProductRequestDTO dto) {
        CategoryModel category = categoryRepository.findByName(dto.category())
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada: " + dto.category()));

        ProductModel model = new ProductModel();
        model.setName(dto.name());
        model.setDescription(dto.description());
        model.setPrice(dto.price());
        model.setEstatus(dto.productStatus());
        model.setCriticalQuantity(dto.criticalQuantity());
        model.setAvailableQuantity(dto.availableQuantity());
        model.setCategory(category);

        return model;
    }

    public ProductResponseDTO toDTO(ProductModel model) {
        return new ProductResponseDTO(
                model.getId(),
                model.getName(),
                model.getDescription(),
                model.getPrice(),
                model.getEstatus(),
                model.getCriticalQuantity(),
                model.getAvailableQuantity(),
                model.getCategory().getName()
        );
    }

    public void updateModelFromDTO(ProductRequestDTO dto, ProductModel model) {
        model.setName(dto.name());
        model.setDescription(dto.description());
        model.setPrice(dto.price());
        model.setEstatus(dto.productStatus());
        model.setCriticalQuantity(dto.criticalQuantity());
        model.setAvailableQuantity(dto.availableQuantity());
    }
}

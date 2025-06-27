package com.tap.serve.singapur.mapper;

import com.tap.serve.singapur.dto.ProductDTO;
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

    public ProductModel toModel(ProductDTO dto) {
        CategoryModel category = categoryRepository.findByName(dto.category())
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada: " + dto.category()));

        ProductModel model = new ProductModel();
        model.setId(dto.id());
        model.setName(dto.name());
        model.setDescription(dto.description());
        model.setPrice(dto.price());
        model.setEstatus(dto.estado());
        model.setCriticalQuantity(dto.cantidadCritica());
        model.setAvailableQuantity(dto.cantidadDisponible());
        model.setCategory(category);

        return model;
    }

    public ProductDTO toDTO(ProductModel model) {
        return new ProductDTO(
                model.getId(),
                model.getName(),
                model.getDescription(),
                model.getPrice(),
                model.isEstado(),
                model.getCriticalQuantity(),
                model.getCantidadDisponible(),
                model.getCategory().getName()
        );
    }
}

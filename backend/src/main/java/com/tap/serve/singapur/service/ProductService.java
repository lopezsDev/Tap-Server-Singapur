package com.tap.serve.singapur.service;

import com.tap.serve.singapur.dto.ProductRequestDTO;
import com.tap.serve.singapur.utils.ApiResp;
import com.tap.serve.singapur.dto.ProductResponseDTO;
import com.tap.serve.singapur.dto.ProductOutputRequestDTO;
import com.tap.serve.singapur.mapper.ProductMapper;
import com.tap.serve.singapur.model.CategoryModel;
import com.tap.serve.singapur.model.ProductModel;
import com.tap.serve.singapur.repository.CategoryRepository;
import com.tap.serve.singapur.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productMapper = productMapper;
    }

    public List<ProductResponseDTO> findAll() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toDTO)
                .toList();
    }

    public ProductResponseDTO findById(long id) {
        return productMapper.toDTO(
                productRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Producto con ID " + id + " no encontrado"))
        );

    }

    public ProductResponseDTO create(ProductRequestDTO productDTO) {

        CategoryModel category = categoryRepository.findByName(productDTO.category())
                .orElseThrow(() -> new EntityNotFoundException("Categoría "+ productDTO.category() +" no encontrada con ID: "));

        ProductModel model = productMapper.toModel(productDTO);
                model.setCategory(category);
                return productMapper.toDTO(productRepository.save(model));
    }

    public ProductResponseDTO update(long id, ProductRequestDTO productDTO) {
        ProductModel existing = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto con ID " + id + " no encontrado"));

        CategoryModel category = categoryRepository.findByName(productDTO.category())
                .orElseThrow(()-> new EntityNotFoundException("Categoría "+ productDTO.category() +" no encontrado"));

        productMapper.updateModelFromDTO(productDTO, existing);
        existing.setCategory(category);

        return productMapper.toDTO(productRepository.save(existing));
    }

    public void deleteById(long id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Producto con el id: " + id + " no encontrado");
        }
        productRepository.deleteById(id);
    }

    public ProductResponseDTO outProduct(long id, ProductOutputRequestDTO productOutDTO) {

            ProductModel product = productRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Producto con id: " + id + " no encontrado"));

            if (product.getAvailableQuantity() < productOutDTO.withdrawnQuantity()) {
                throw new IllegalArgumentException("No hay suficiente inventario disponible. Cantidad actual: "
                        + product.getAvailableQuantity());
            }

            product.setWithdrawnQuantity(productOutDTO.withdrawnQuantity());
            product.setRetirementReason(productOutDTO.retirementReason());
            product.setAvailableQuantity(product.getAvailableQuantity() - productOutDTO.withdrawnQuantity());

            return productMapper.toDTO(productRepository.save(product));

    }
}


package com.tap.serve.singapur.service;

import com.tap.serve.singapur.dto.ProductRequestDTO;
import com.tap.serve.singapur.dto.ProductResponseDTO;
import com.tap.serve.singapur.dto.ProductOutputRequestDTO;
import com.tap.serve.singapur.mapper.ProductMapper;
import com.tap.serve.singapur.model.CategoryModel;
import com.tap.serve.singapur.model.ProductModel;
import com.tap.serve.singapur.repository.CategoryRepository;
import com.tap.serve.singapur.repository.ProductRepository;
import com.tap.serve.singapur.utils.exception.CategoryNotFoundException;
import com.tap.serve.singapur.utils.exception.InsufficientInventoryException;
import com.tap.serve.singapur.utils.exception.ProductNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    public Page<ProductResponseDTO> findAll(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(productMapper::toDTO);
    }

    public ProductResponseDTO findById(long id) {
        return productMapper.toDTO(
                productRepository.findById(id)
                        .orElseThrow(() -> new ProductNotFoundException("Producto con ID " + id + " no encontrado"))
        );

    }

    public ProductResponseDTO create(ProductRequestDTO productDTO) {

        CategoryModel category = categoryRepository.findByName(productDTO.category())
                .orElseThrow(() -> new CategoryNotFoundException("Categoría "+ productDTO.category() +" no encontrada"));

        ProductModel model = productMapper.toModel(productDTO);
                model.setCategory(category);
                return productMapper.toDTO(productRepository.save(model));
    }

    public ProductResponseDTO update(long id, ProductRequestDTO productDTO) {
        ProductModel existing = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Producto con ID " + id + " no encontrado"));

        CategoryModel category = categoryRepository.findByName(productDTO.category())
                .orElseThrow(()-> new CategoryNotFoundException("Categoría "+ productDTO.category() +" no encontrado"));

        productMapper.updateModelFromDTO(productDTO, existing);
        existing.setCategory(category);

        return productMapper.toDTO(productRepository.save(existing));
    }

    public void deleteById(long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Producto con el id: " + id + " no encontrado");
        }
        productRepository.deleteById(id);
    }

    public ProductResponseDTO outProduct(long id, ProductOutputRequestDTO productOutDTO) {

            ProductModel product = productRepository.findById(id)
                    .orElseThrow(() -> new ProductNotFoundException("Producto con id: " + id + " no encontrado"));

            if (product.getAvailableQuantity() < productOutDTO.withdrawnQuantity()) {
                throw new InsufficientInventoryException("No hay suficiente inventario disponible. Cantidad actual: "
                        + product.getAvailableQuantity());
            }

            product.setWithdrawnQuantity(productOutDTO.withdrawnQuantity());
            product.setRetirementReason(productOutDTO.retirementReason());
            product.setAvailableQuantity(product.getAvailableQuantity() - productOutDTO.withdrawnQuantity());

            return productMapper.toDTO(productRepository.save(product));

    }

    @Transactional(readOnly = true)
    public List<ProductResponseDTO> findByName(String name) {
        String sanitized = name.trim().toLowerCase();
        if (sanitized.isEmpty()) return List.of();

        List<ProductModel> products = productRepository.findByNameContainingIgnoreCase(sanitized);
        return products.stream()
                .map(productMapper::toDTO)
                .toList();
    }
}


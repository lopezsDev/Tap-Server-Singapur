package com.tap.serve.singapur.service;

import com.tap.serve.singapur.config.ApiResp;
import com.tap.serve.singapur.dto.ProductDTO;
import com.tap.serve.singapur.dto.ProductOutDTO;
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

    public List<ProductDTO> findAll() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toDTO)
                .toList();
    }

    public ProductDTO findById(long id) {
        ProductModel product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto con el id: " + id + " no encontrado"));

        return productMapper.toDTO(product);
    }

    public ProductDTO save(ProductDTO productDTO) {

        ProductModel productModel = productMapper.toModel(productDTO);

        if (productModel.getCategory() == null || productModel.getCategory().getId() == null) {
            throw new IllegalArgumentException("Debe especificar una categoría válida");
        }

        CategoryModel category = categoryRepository.findById(productModel.getCategory().getId())
                .orElseThrow(() -> new EntityNotFoundException("Categoría no encontrada con ID: " +
                        productModel.getCategory().getId()));

        productModel.setCategory(category);

        return productMapper.toDTO(productRepository.save(productModel));
    }

    public void deleteById(long id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Producto con el id: " + id + " no encontrado");
        }
        productRepository.deleteById(id);
    }

    public ApiResp<ProductDTO> outProduct(long id, ProductOutDTO productOutDTO) {
        try {
            ProductModel product = productRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Producto con id: " + id + " no encontrado"));

            if (product.getCantidadDisponible() < productOutDTO.cantidadRetirada()) {
                return ApiResp.error("No hay suficiente inventario disponible. Cantidad actual: "
                        + product.getCantidadDisponible());
            }

            product.setCantidadRetirada(productOutDTO.cantidadRetirada());
            product.setMotivoRetiro(productOutDTO.motivoRetiro());
            product.setCantidadDisponible(product.getCantidadDisponible() - productOutDTO.cantidadRetirada());

            ProductModel updatedProduct = productRepository.save(product);
            return ApiResp.success(
                    "Retiro de inventario realizado exitosamente",
                    productMapper.toDTO(updatedProduct)
            );
        } catch (EntityNotFoundException e) {
            return ApiResp.error(e.getMessage());
        } catch (Exception e) {
            return ApiResp.error("Error al realizar el retiro: " + e.getMessage());
        }
    }
}


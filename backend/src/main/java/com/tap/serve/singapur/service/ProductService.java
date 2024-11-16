package com.tap.serve.singapur.service;

import com.tap.serve.singapur.model.ProductModel;
import com.tap.serve.singapur.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductModel> findAll() {
        return productRepository.findAll();
    }

    public ProductModel findById(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Producto con el id: " + id + " no encontrado"));
    }

    public ProductModel save(ProductModel productModel) {
        return productRepository.save(productModel);
    }

    public void deleteById(long id) {
        if (!productRepository.existsById(id)) {
            throw new EntityNotFoundException("Producto con el id: " + id + " no encontrado");
        }
        productRepository.deleteById(id);
    }
}

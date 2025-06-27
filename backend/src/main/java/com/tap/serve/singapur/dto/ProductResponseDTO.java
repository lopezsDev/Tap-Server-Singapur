package com.tap.serve.singapur.dto;

import com.tap.serve.singapur.enums.ProductStatus;

public record ProductResponseDTO(
        Long id,
        String name,
        String description,
        Double price,
        ProductStatus productStatus,
        int criticalQuantity,
        int availableQuantity,
        String category
) {
}
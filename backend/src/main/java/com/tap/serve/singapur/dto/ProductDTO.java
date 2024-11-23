package com.tap.serve.singapur.dto;

import com.tap.serve.singapur.model.CategoryModel;

public record ProductDTO(
        Long id,
        String name,
        String description,
        Double price,
        boolean estado,
        int cantidadCritica,
        int cantidadDisponible,
        String category
) {
}
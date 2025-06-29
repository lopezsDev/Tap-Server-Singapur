package com.tap.serve.singapur.dto;

import com.tap.serve.singapur.enums.ProductStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProductRequestDTO(
        @NotBlank(message = "El nombre del producto es obligatorio.")
        String name,

        @NotBlank(message = "La descripción del producto no puede estar vacía.")
        String description,

        @NotNull(message = "Debe especificar un precio.")
        @Positive(message = "El precio debe ser un valor positivo.")
        Double price,

        @NotNull(message = "Debe indicar si el producto está disponile o no.")
        ProductStatus productStatus,

        @Min(value = 0, message = "La cantidad crítica no puede ser negativa.")
        int criticalQuantity,

        @Min(value = 0, message = "La cantidad disponible no puede ser negativa.")
        int availableQuantity,

        @NotNull(message = "Debe indicar la categoría del producto.")
        String category
) {
}

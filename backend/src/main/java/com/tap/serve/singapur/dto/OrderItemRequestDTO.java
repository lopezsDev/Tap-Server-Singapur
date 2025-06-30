package com.tap.serve.singapur.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record OrderItemRequestDTO(
        @NotNull(message = "El ID del producto es requerido") Long productId,
        @Min(value = 1, message = "La cantidad minima deber ser 1")
        Integer quantity
) {
}

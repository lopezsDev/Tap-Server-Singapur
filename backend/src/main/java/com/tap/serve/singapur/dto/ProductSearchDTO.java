package com.tap.serve.singapur.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProductSearchDTO(
        @NotBlank(message = "El nombre del producto no puede estar vacío")
        @Size(min = 1, max = 20, message = "El nombre debe tener entre 1 y 20 caracteres")
        String name,

        @Min(value = 0, message = "La página no puede ser negativa")
        Integer page,

        @Min(value = 1, message = "El tamaño debe ser al menos 1")
        Integer size
) {
        public int pageOrDefault() {
                return page != null ? page : 0;
        }

        public int sizeOrDefault() {
                return size != null ? size : 5;
        }
}

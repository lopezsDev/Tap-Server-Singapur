package com.tap.serve.singapur.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProductSearchDTO(
        @NotBlank(message = "El nombre del producto no puede estar vacío")
        @Size(min = 1, max = 100, message = "El nombre debe tener entre 1 y 100 caracteres")
        String name
) {}

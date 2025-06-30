package com.tap.serve.singapur.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
        @NotBlank(message = "El nombre de usuario es requerido")
        String username,
        @NotBlank(message = "La contraseña es requerida")
        String password
) {
}

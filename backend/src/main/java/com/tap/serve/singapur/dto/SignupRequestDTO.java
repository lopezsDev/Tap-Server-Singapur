package com.tap.serve.singapur.dto;

import com.tap.serve.singapur.enums.RolEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.Set;

public record SignupRequestDTO(
        @NotBlank(message="El nombre de usuario es obligatorio")
        String username,

        @NotBlank(message = "La contraseña es obligatoria")
        String password,

        @NotBlank(message = "El nombre es obligatorio")
        String name,

        String lastname,

        @NotNull(message = "Debe indicar el rol del usuario")
        RolEnum rol,

        @NotEmpty(message = "Debe asignar los permisos por el ID respectivo")
        Set<Long> permissions
) {
}

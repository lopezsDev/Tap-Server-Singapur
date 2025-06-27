package com.tap.serve.singapur.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record OrderRequestDTO(

        String observaciones,

        @NotEmpty(message = "Debe incluir al menos un producto en el pedido")
        List<@NotNull(message = "El ID del producto no puede ser nulo") Long> products
) {}


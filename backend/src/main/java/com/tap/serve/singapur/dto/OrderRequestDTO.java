package com.tap.serve.singapur.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record OrderRequestDTO(

        String observations,

        @NotEmpty(message = "Debe incluir al menos un producto en el pedido")
        List<@Valid OrderItemRequestDTO> products
) {}


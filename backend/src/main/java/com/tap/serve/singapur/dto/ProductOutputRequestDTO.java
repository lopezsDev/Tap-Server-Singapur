package com.tap.serve.singapur.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductOutputRequestDTO(
        @NotNull(message = "Debe especificar la cantidad retirada")
        Integer withdrawnQuantity,
        @NotBlank(message = "Debe especificar la razón de retiro")
        String retirementReason
) {
}
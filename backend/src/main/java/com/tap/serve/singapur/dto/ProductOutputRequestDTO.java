package com.tap.serve.singapur.dto;

import jakarta.validation.constraints.NotBlank;

public record ProductOutputRequestDTO(
        @NotBlank(message = "Debe especificar la cantidad retirada")
        int withdrawnQuantity,
        @NotBlank(message = "Debe especificar la razón de retiro")
        String retirementReason
) {
}
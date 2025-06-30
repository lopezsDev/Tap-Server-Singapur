package com.tap.serve.singapur.dto;

import com.tap.serve.singapur.enums.UnitMeasure;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CategoryRequestDTO(
    @NotBlank(message = "El nombre de la categoría es obligatorio.")
    String name,

    @NotBlank(message = "La descripción de la categoría no puede estar vacía.")
    String description,

    @NotNull(message = "Debe especificar la unidad de medida.")
    UnitMeasure unitOfMeasure
) {
}

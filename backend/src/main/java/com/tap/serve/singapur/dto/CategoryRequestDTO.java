package com.tap.serve.singapur.dto;

import com.tap.serve.singapur.enums.UnitMeasure;
import jakarta.validation.constraints.NotBlank;

public record CategoryRequestDTO(
    @NotBlank(message = "El nombre de la categoría es obligatorio.")
    String name,

    @NotBlank(message = "La descripción de la categoría no puede estar vacía.")
    String description,

    @NotBlank(message = "Debe especificar la unidad de medida.")
    UnitMeasure unitOfMeasure
) {
}

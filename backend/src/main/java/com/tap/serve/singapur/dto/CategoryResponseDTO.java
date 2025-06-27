package com.tap.serve.singapur.dto;

import com.tap.serve.singapur.enums.UnitMeasure;

public record CategoryResponseDTO(
        Long id,
        String name,
        String description,
        UnitMeasure unitMeasure
) {
}


package com.tap.serve.singapur.dto;

import java.time.LocalDateTime;
import java.util.List;

public record OrderResponseDTO(
        String observations,
        LocalDateTime OrderDate,
        List<SimpleProductDTO> products
) {}

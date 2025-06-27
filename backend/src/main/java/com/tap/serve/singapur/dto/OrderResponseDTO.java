package com.tap.serve.singapur.dto;

import java.time.LocalDateTime;
import java.util.List;

public record OrderResponseDTO(
        Long id,
        String observaciones,
        LocalDateTime fechaPedido,
        List<SimpleProductDTO> productos
) {}
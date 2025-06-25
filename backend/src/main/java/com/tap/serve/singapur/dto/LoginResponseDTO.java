package com.tap.serve.singapur.dto;

public record LoginResponseDTO(
        String token,
        String type,
        String username
) {
}

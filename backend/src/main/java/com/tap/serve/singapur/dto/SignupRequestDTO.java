package com.tap.serve.singapur.dto;

import com.tap.serve.singapur.enums.RolEnum;
import java.util.Set;

public record SignupRequestDTO(
        String username,
        String password,
        String name,
        String lastname,
        RolEnum rol,
        Set<Long> permissions
) {
}

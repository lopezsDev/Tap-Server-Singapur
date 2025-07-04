package com.tap.serve.singapur.mapper;

import com.tap.serve.singapur.dto.OrderResponseDTO;
import com.tap.serve.singapur.dto.SimpleProductDTO;
import com.tap.serve.singapur.model.OrderDetailModel;
import com.tap.serve.singapur.model.OrderModel;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderMapper {

    public OrderResponseDTO toDto(OrderModel order) {
        List<SimpleProductDTO> productos = order.getDetails().stream()
                .map(this::toOrderProductDTO)
                .collect(Collectors.toList());

        return new OrderResponseDTO(
                order.getId(),
                order.getObservaciones(),
                order.getFechaPedido(),
                productos
        );
    }

    private SimpleProductDTO toOrderProductDTO(OrderDetailModel detail) {
        return new SimpleProductDTO(
                detail.getProduct().getName(),
                detail.getUnitPrice(),
                detail.getQuantity(),
                detail.getSubtotal()
        );
    }
}
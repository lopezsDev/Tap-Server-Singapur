package com.tap.serve.singapur.service;

import com.tap.serve.singapur.dto.OrderRequestDTO;
import com.tap.serve.singapur.dto.OrderResponseDTO;
import com.tap.serve.singapur.dto.SimpleProductDTO;
import com.tap.serve.singapur.model.OrderModel;
import com.tap.serve.singapur.model.ProductModel;
import com.tap.serve.singapur.repository.OrderRepository;
import com.tap.serve.singapur.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Transactional
    public OrderResponseDTO createOrder(OrderRequestDTO dto) {
        List<ProductModel> product = productRepository.findAllById(dto.products());
        OrderModel order = new OrderModel();
        order.setObservaciones(dto.observaciones());
        order.setProducts(product);
        OrderModel saved = orderRepository.save(order);
        return toDto(saved);
    }

    public List<OrderResponseDTO> listarPedidos() {
        return orderRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    public OrderResponseDTO obtenerPedido(Long id) {
        OrderModel order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        return toDto(order);
    }

    public void eliminarPedido(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Pedido no encontrado para eliminar");
        }
        orderRepository.deleteById(id);
    }

    private OrderResponseDTO toDto(OrderModel order) {
        List<SimpleProductDTO> products = order.getProducts().stream()
                .map(p -> new SimpleProductDTO(p.getName(), p.getPrice(), p.getAvailableQuantity()))
                .collect(Collectors.toList());
        return new OrderResponseDTO(order.getId(), order.getObservaciones(), order.getFechaPedido(), products);
    }
}

package com.tap.serve.singapur.service;

import com.tap.serve.singapur.dto.OrderItemRequestDTO;
import com.tap.serve.singapur.dto.OrderRequestDTO;
import com.tap.serve.singapur.dto.OrderResponseDTO;
import com.tap.serve.singapur.dto.SimpleProductDTO;
import com.tap.serve.singapur.mapper.OrderMapper;
import com.tap.serve.singapur.model.OrderDetailModel;
import com.tap.serve.singapur.model.OrderModel;
import com.tap.serve.singapur.model.ProductModel;
import com.tap.serve.singapur.repository.OrderRepository;
import com.tap.serve.singapur.repository.ProductRepository;
import com.tap.serve.singapur.utils.exception.InsufficientInventoryException;
import com.tap.serve.singapur.utils.exception.OrderNotFoundException;
import com.tap.serve.singapur.utils.exception.ProductNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderMapper orderMapper;

    @Transactional
    public OrderResponseDTO createOrder(OrderRequestDTO dto) {
        OrderModel order = new OrderModel();
        order.setObservaciones(dto.observations());
        order.getFechaPedido();

        List<OrderDetailModel> details = new ArrayList<>();
        List<ProductModel> products = new ArrayList<>();

        for (OrderItemRequestDTO item : dto.products()){
            ProductModel product = productRepository.findById(item.productId())
                    .orElseThrow(()-> new ProductNotFoundException("Producto con el ID "+ item.productId() + " no encontrado"));

            if (product.getAvailableQuantity() < item.quantity()) {
                throw new InsufficientInventoryException("No hay suficiente cantidad disponible para el producto: " + product.getName());
            }

            product.setAvailableQuantity(product.getAvailableQuantity() - item.quantity());

            OrderDetailModel detail = new OrderDetailModel();
            detail.setProduct(product);
            detail.setOrder(order);
            detail.setQuantity(item.quantity());
            detail.setUnitPrice(product.getPrice());
            detail.setSubtotal(product.getPrice() * item.quantity());

            details.add(detail);
            products.add(product);
        }

        order.setDetails(details);
        order.setProducts(products);

        OrderModel saved = orderRepository.save(order);
        return orderMapper.toDto(saved);
    }

    public List<OrderResponseDTO> findAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(orderMapper::toDto)
                .toList();
    }

    public OrderResponseDTO findById(Long id) {
        OrderModel order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Pedido "+ id +" no encontrado"));
        return orderMapper.toDto(order);
    }

    public void delete(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new OrderNotFoundException("Pedido "+ id + " no encontrado");
        }
        orderRepository.deleteById(id);
    }
}

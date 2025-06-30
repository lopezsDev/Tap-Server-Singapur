package com.tap.serve.singapur.controller;

import com.tap.serve.singapur.dto.OrderRequestDTO;
import com.tap.serve.singapur.dto.OrderResponseDTO;
import com.tap.serve.singapur.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService pedidoService;

    @PostMapping
    public ResponseEntity<OrderResponseDTO> crear(@Valid @RequestBody OrderRequestDTO dto) {
        return ResponseEntity.ok(pedidoService.createOrder(dto));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> listar() {
        return ResponseEntity.ok(pedidoService.findAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(pedidoService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        pedidoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

package com.tap.serve.singapur.controller;

import com.tap.serve.singapur.dto.OrderRequestDTO;
import com.tap.serve.singapur.dto.OrderResponseDTO;
import com.tap.serve.singapur.service.OrderService;
import com.tap.serve.singapur.utils.ApiResp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService pedidoService;

    @Operation(summary = "Create a new order", description = "Register a new order with products and quantities.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Order created successfully",
                    content = @Content(schema = @Schema(implementation = OrderResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data"),
            @ApiResponse(responseCode = "404", description = "Some product not found")
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('WAITER')")
    @PostMapping
    public ResponseEntity<ApiResp<OrderResponseDTO>> createOrder(@Valid @RequestBody OrderRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResp.success("Pedido creado exitosamente",
                        pedidoService.createOrder(dto)));
    }

    @Operation(summary = "Get all orders", description = "Retrieve a list of all registered orders.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved orders list")
    })
    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('WAITER')")
    public ResponseEntity<ApiResp<List<OrderResponseDTO>>> getAllOrders() {
        return ResponseEntity.ok(ApiResp.success("Lista de pedidos",
                pedidoService.findAllOrders()));
    }

    @Operation(summary = "Get order by ID", description = "Retrieve an order by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Order found"),
            @ApiResponse(responseCode = "404", description = "Order not found")
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('WAITER')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResp<OrderResponseDTO>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResp.success("Orden recuperada",
                pedidoService.findById(id)));
    }

    @Operation(summary = "Delete an order", description = "Delete an existing order by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Order deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Order not found")
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('WAITER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResp<Void>> eliminar(@PathVariable Long id) {
        pedidoService.delete(id);
        return ResponseEntity.ok(ApiResp.success("Pedido eliminado", null));
    }
}

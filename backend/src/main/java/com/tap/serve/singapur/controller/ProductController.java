package com.tap.serve.singapur.controller;

import com.tap.serve.singapur.dto.ProductRequestDTO;
import com.tap.serve.singapur.utils.ApiResp;
import com.tap.serve.singapur.dto.ProductResponseDTO;
import com.tap.serve.singapur.dto.ProductOutputRequestDTO;
import com.tap.serve.singapur.model.ProductModel;
import com.tap.serve.singapur.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Operation(summary = "Get all products", description = "Retrieve a list of all products.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved list")
    })
    @PreAuthorize("hasAuthority('PERMISSION_READ')")
    @GetMapping
    public ResponseEntity<ApiResp<List<ProductResponseDTO>>> getAllProducts() {
        return ResponseEntity.ok(ApiResp.success("Productos encontrados", productService.findAll()));
    }

    @Operation(summary = "Get product by ID", description = "Retrieve a product by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product found",
                    content = @Content(schema = @Schema(implementation = ProductModel.class))),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @PreAuthorize("hasAuthority('PERMISSION_READ')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResp<ProductResponseDTO>> getProductById(@PathVariable long id) {
        return ResponseEntity.ok(ApiResp.success("Producto encontrado", productService.findById(id)));
    }

    @Operation(summary = "Create a new product", description = "Add a new product to the database.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Product created",
                    content = @Content(schema = @Schema(implementation = ProductModel.class)))
    })
    @PreAuthorize("hasAuthority('PERMISSION_CREATE') or hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ApiResp<ProductResponseDTO>> createProduct(@Valid @RequestBody ProductRequestDTO productDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResp.success("Producto creado correctamente",
                        productService.create(productDTO)));
    }

    @Operation(summary = "Update an existing product", description = "Update the details of an existing product.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product updated",
                    content = @Content(schema = @Schema(implementation = ProductModel.class))),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @PreAuthorize("hasAuthority('PERMISSION_UPDATE') or hasRole('ADMIN')")
    public ResponseEntity<ApiResp<ProductResponseDTO>> updateProduct(@PathVariable long id, @Valid @RequestBody ProductRequestDTO productDTO) {
        return ResponseEntity.ok(ApiResp.success("Producto actualizado correctamente",
                productService.update(id, productDTO)));
    }

    @Operation(summary = "Delete a product", description = "Delete a product by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Product deleted"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResp<Void>> deleteProduct(@PathVariable long id) {
        productService.deleteById(id);
        return ResponseEntity.ok(ApiResp.success("Producto eliminido exitosamente", null));
    }

    @Operation(summary = "Generate exception on product", description = "Exception on product by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Product exception added"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @PreAuthorize("hasRole('ADMINy')")
    @PutMapping("/outputproduct/{id}")
    public ResponseEntity<ApiResp<ProductResponseDTO>> outProduct(@PathVariable long id, @Valid @RequestBody ProductOutputRequestDTO productOutDTO){
        return ResponseEntity.ok(ApiResp.success("Producto encontrado",
                productService.outProduct(id, productOutDTO)));
    }
}

package com.tap.serve.singapur.controller;

import com.tap.serve.singapur.config.ApiResp;
import com.tap.serve.singapur.dto.ProductDTO;
import com.tap.serve.singapur.dto.ProductOutDTO;
import com.tap.serve.singapur.model.ProductModel;
import com.tap.serve.singapur.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @Operation(summary = "Get product by ID", description = "Retrieve a product by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product found",
                    content = @Content(schema = @Schema(implementation = ProductModel.class))),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    @Operation(summary = "Create a new product", description = "Add a new product to the database.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Product created",
                    content = @Content(schema = @Schema(implementation = ProductModel.class)))
    })
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO productDTO) {
        try {
            ProductDTO savedProduct = productService.save(productDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
        } catch (EntityNotFoundException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @Operation(summary = "Update an existing product", description = "Update the details of an existing product.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product updated",
                    content = @Content(schema = @Schema(implementation = ProductModel.class))),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable long id, @RequestBody ProductDTO productDTO) {

        ProductDTO updatedDTO = new ProductDTO(
                id,
                productDTO.name(),
                productDTO.description(),
                productDTO.price(),
                productDTO.estado(),
                productDTO.cantidadCritica(),
                productDTO.cantidadDisponible(),
                productDTO.category()
        );
        return ResponseEntity.ok(productService.save(updatedDTO));
    }

    @Operation(summary = "Delete a product", description = "Delete a product by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Product deleted"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable long id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Generate exception on product", description = "Exception on product by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Product exception added"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @PutMapping("/outproduct/{id}")
    public ResponseEntity<ApiResp<ProductDTO>> outProduct(
            @PathVariable long id,
            @RequestBody ProductOutDTO productOutDTO
    ) {
        ApiResp<ProductDTO> response = productService.outProduct(id, productOutDTO);
        return response.status().equals("SUCCESS")
                ? ResponseEntity.ok(response)
                : ResponseEntity.badRequest().body(response);
    }
}

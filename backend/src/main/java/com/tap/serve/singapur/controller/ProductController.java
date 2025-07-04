package com.tap.serve.singapur.controller;

import com.tap.serve.singapur.dto.ProductRequestDTO;
import com.tap.serve.singapur.dto.ProductSearchDTO;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    public ResponseEntity<ApiResp<Page<ProductResponseDTO>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "15") int size
    ) {
        return ResponseEntity.ok(ApiResp.success("Productos encontrados",
                productService.findAll(PageRequest.of(page, size))));
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

    @PreAuthorize("hasAuthority('PERMISSION_READ')")
    @GetMapping("/search/{name}")
    public ResponseEntity<ApiResp<List<ProductResponseDTO>>> searchProductsByName(@PathVariable String name) {
        List<ProductResponseDTO> products = productService.searchByName(name);
        return ResponseEntity.ok(ApiResp.success("Productos encontrados", products));
    }


    @Operation(summary = "Create a new product", description = "Add a new product to the database.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Product created",
                    content = @Content(schema = @Schema(implementation = ProductModel.class)))
    })
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('PERMISSION_CREATE')")
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
    @PreAuthorize("hasAuthority('PERMISSION_UPDATE') and hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResp<ProductResponseDTO>> updateProduct(@PathVariable long id, @Valid @RequestBody ProductRequestDTO productDTO) {
        return ResponseEntity.ok(ApiResp.success("Producto actualizado correctamente",
                productService.update(id, productDTO)));
    }

    @Operation(summary = "Delete a product", description = "Delete a product by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Product deleted"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('PERMISSION_DELETE')")
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
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('PERMISSION_UPDATE')")
    @PutMapping("/output-product/{id}")
    public ResponseEntity<ApiResp<ProductResponseDTO>> outProduct(@PathVariable long id, @Valid @RequestBody ProductOutputRequestDTO productOutDTO){
        return ResponseEntity.ok(ApiResp.success("Producto encontrado",
                productService.outProduct(id, productOutDTO)));
    }


    @PreAuthorize("hasAuthority('PERMISSION_READ')")
    @PostMapping("/search/by-name")
    public ResponseEntity<ApiResp<Page<ProductResponseDTO>>> search(@Valid @RequestBody ProductSearchDTO searchDTO) {
        Page<ProductResponseDTO> results = productService.findByName(
                searchDTO.name(),
                searchDTO.pageOrDefault(),
                searchDTO.sizeOrDefault()
        );

        return ResponseEntity.ok(ApiResp.success("Resultados paginados", results));
    }

}

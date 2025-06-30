package com.tap.serve.singapur.controller;

import com.tap.serve.singapur.dto.CategoryRequestDTO;
import com.tap.serve.singapur.dto.CategoryResponseDTO;
import com.tap.serve.singapur.model.CategoryModel;
import com.tap.serve.singapur.service.CategoryService;
import com.tap.serve.singapur.utils.ApiResp;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Operation(summary = "Get all categories", description = "Retrieve a list of all categories.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved list")
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('WAITER') and hasAuthority('PERMISSION_READ')")
    @GetMapping
    public ResponseEntity<ApiResp<List<CategoryResponseDTO>>> getAllCategories() {
        return ResponseEntity.ok(ApiResp.success("Categorías disponibles",
                categoryService.findAll()));
    }

    @Operation(summary = "Get category by ID", description = "Retrieve a category by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category found",
                    content = @Content(schema = @Schema(implementation = CategoryModel.class))),
            @ApiResponse(responseCode = "404", description = "Category not found")
    })
    @PreAuthorize("hasRole('ADMIN') or hasRole('WAITER') and hasAuthority('PERMISSION_READ')")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResp<CategoryResponseDTO>> getCategoryById(@PathVariable long id) {
        return ResponseEntity.ok(ApiResp.success("Categoría encontrada", categoryService.findById(id)));
    }

    @Operation(summary = "Create a new category", description = "Add a new category to the database.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Category created",
                    content = @Content(schema = @Schema(implementation = CategoryModel.class)))
    })
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('PERMISSION_CREATE')")
    @PostMapping
    public ResponseEntity<ApiResp<CategoryResponseDTO>> createCategory(@Valid @RequestBody CategoryRequestDTO categoryRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResp.success("Categoría creada exitosamente",
                        categoryService.create(categoryRequestDTO)));
    }

    @Operation(summary = "Update an existing category", description = "Update the details of an existing category.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Category updated",
                    content = @Content(schema = @Schema(implementation = CategoryModel.class))),
            @ApiResponse(responseCode = "404", description = "Category not found")
    })
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('PERMISSION_UPDATE')")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResp<CategoryResponseDTO>> updateCategory(@PathVariable long id, @Valid @RequestBody CategoryRequestDTO categoryRequestDTO) {
        return ResponseEntity
                .ok(ApiResp.success("Categoría actualizada exitosamente",
                        categoryService.update(id, categoryRequestDTO)));
    }

    @Operation(summary = "Delete a category", description = "Delete a category by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Category deleted"),
            @ApiResponse(responseCode = "404", description = "Category not found")
    })
    @PreAuthorize("hasRole('ADMIN') and hasAuthority('PERMISSION_DELETE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResp<Void>> deleteCategory(@PathVariable long id) {
        categoryService.deleteById(id);
        return ResponseEntity
                .ok(ApiResp.success("Categoría elimina exitosamente", null));
    }
}

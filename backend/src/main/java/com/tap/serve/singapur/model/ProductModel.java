package com.tap.serve.singapur.model;

import com.tap.serve.singapur.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.*;

@Setter @Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity @Table(name = "product")
public class ProductModel {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double price;

    private ProductStatus estatus;

    @Column(name = "critical_quantity")
    private int criticalQuantity;

    @Column(name = "available_quantity")
    private int availableQuantity;

    @Column(name = "withdrawnQuantity")
    private int withdrawnQuantity;

    @Column(name = "retirementReason")
    private String retirementReason;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryModel category;
}

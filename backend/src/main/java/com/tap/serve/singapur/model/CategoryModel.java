package com.tap.serve.singapur.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tap.serve.singapur.enums.UnitMeasure;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "category")
public class CategoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    @Column(name = "unit_measure",  unique = true, nullable = false, updatable = true)
    @Enumerated(EnumType.STRING)
    private UnitMeasure unitOfMeasure;

    @JsonIgnore
    @OneToMany(mappedBy = "category", cascade = CascadeType.PERSIST)
    private List<ProductModel> products;
}

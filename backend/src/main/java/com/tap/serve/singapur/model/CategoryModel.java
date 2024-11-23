package com.tap.serve.singapur.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
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

    @Column(name = "unidad_medida")
    private String unidadMedida;

    @JsonIgnore
    @OneToMany(mappedBy = "category", cascade = CascadeType.PERSIST)
    private List<ProductModel> products;
}

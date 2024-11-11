package com.tap.serve.singapur.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "producto")
public class ProductModel {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Double price;

    private boolean estado;

    @Column(name = "cantidad_critica")
    private int cantidadCritica;

    @Column(name = "cantidad_disponible")
    private int cantidadDisponible;

    private String categoria;

}

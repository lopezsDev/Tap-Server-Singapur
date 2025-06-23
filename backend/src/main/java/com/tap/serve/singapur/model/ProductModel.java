package com.tap.serve.singapur.model;

import jakarta.persistence.*;
import lombok.*;

@Setter @Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "product")
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

    @Column(name = "cantidad_retirada")
    private Integer cantidadRetirada;

    @Column(name = "motivo_retiro")
    private String motivoRetiro;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryModel category;
}

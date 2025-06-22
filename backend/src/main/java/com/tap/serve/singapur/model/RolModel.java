package com.tap.serve.singapur.model;


import com.tap.serve.singapur.enums.RolEnum;
import jakarta.persistence.*;

public class RolModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role_name")
    @Enumerated(EnumType.STRING)
    private RolEnum rol;
}

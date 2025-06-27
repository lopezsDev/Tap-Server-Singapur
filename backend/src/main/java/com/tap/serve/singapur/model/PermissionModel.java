package com.tap.serve.singapur.model;

import com.tap.serve.singapur.enums.PermissionEnum;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "permissions")
public class PermissionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "permission_name", unique = true, nullable = false, updatable = false)
    @Enumerated(EnumType.STRING)
    private PermissionEnum permissionName;
}

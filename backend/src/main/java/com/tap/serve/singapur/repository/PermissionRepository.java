package com.tap.serve.singapur.repository;

import com.tap.serve.singapur.enums.PermissionEnum;
import com.tap.serve.singapur.model.PermissionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<PermissionModel, Long> {

    Optional<PermissionModel> findByPermissionName(PermissionEnum perm);
}

package com.tap.serve.singapur.repository;

import com.tap.serve.singapur.enums.RolEnum;
import com.tap.serve.singapur.model.RolModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<RolModel, Long> {

    Optional<RolModel> findByRol(RolEnum rol);
}

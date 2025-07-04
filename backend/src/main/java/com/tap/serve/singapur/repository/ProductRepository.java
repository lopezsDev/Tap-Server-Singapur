package com.tap.serve.singapur.repository;

import com.tap.serve.singapur.model.ProductModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    Page<ProductModel> findByNameContainingIgnoreCase(String searchPattern, Pageable pageable);
    List<ProductModel> findByNameContainingIgnoreCase(String name);

}

package com.tap.serve.singapur.repository;

import com.tap.serve.singapur.model.CategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryModel, Long> {
    Optional<CategoryModel> findByName(String category);
}

package com.tap.serve.singapur.repository;

import com.tap.serve.singapur.model.OrderDetailModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository extends JpaRepository<OrderDetailModel, Long> {
}

package com.tap.serve.singapur.repository;

import com.tap.serve.singapur.model.OrderModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderModel, Long> {
}

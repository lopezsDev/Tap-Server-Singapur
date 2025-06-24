package com.tap.serve.singapur.repository;

import com.tap.serve.singapur.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

    Optional<UserModel> findUserModelByUsername(String username);

    boolean existsByUsername(String username);

    UserModel findByUsername(String username);
}

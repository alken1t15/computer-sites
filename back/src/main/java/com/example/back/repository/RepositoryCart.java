package com.example.back.repository;


import com.example.back.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryCart extends JpaRepository<Cart, Long> {
}
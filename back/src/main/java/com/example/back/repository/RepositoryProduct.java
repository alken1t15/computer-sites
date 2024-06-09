package com.example.back.repository;

import com.example.back.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryProduct extends JpaRepository<Product,Long> {
}

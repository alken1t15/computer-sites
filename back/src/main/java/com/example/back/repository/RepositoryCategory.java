package com.example.back.repository;

import com.example.back.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryCategory extends JpaRepository<Category,Long> {

}

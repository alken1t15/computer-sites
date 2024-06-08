package com.example.back.repository;

import com.example.back.entity.Computer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepositoryComputer extends JpaRepository<Computer, Long> {
    List<Computer> findAllByNameLikeIgnoreCase(String name);
}
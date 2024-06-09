package com.example.back.repository;

import com.example.back.entity.Computer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RepositoryComputer extends JpaRepository<Computer, Long> {
    @Query("select c from Computer c where c.name like ?1%")
    List<Computer> findByStartName(String name);
    @Query("select c from Computer c where c.name like %?1%")
    List<Computer> findByBetweenName(String name);

    @Query("select c from Computer c where c.name like %?1")
    List<Computer> findByEndName(String name);
    List<Computer> findAllByNameLike(String name);
}
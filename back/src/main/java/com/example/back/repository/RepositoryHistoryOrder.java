package com.example.back.repository;

import com.example.back.entity.HistoryOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepositoryHistoryOrder extends JpaRepository<HistoryOrder,Long> {
}

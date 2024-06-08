package com.example.back.repository;

import com.example.back.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepositoryUsers extends JpaRepository<Users,Long> {
    Optional<Users> findByEmail(String email);

    Optional<Users> findByPhone(String phone);
}
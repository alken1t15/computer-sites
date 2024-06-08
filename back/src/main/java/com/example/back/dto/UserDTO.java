package com.example.back.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserDTO {
    private String email;
    private String name;
    private String phone;
}
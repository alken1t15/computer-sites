package com.example.back.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartAddDTO {
    @NotNull
    private Long id;
}
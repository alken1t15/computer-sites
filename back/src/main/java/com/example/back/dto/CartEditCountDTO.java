package com.example.back.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartEditCountDTO {
    @NotNull
    private Long id;
    @NotNull
    private String name;
}

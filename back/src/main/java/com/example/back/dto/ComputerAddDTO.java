package com.example.back.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ComputerAddDTO {
    @NotNull
    private String name;
    @NotNull
    private List<Long> idProducts;
}
package com.example.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartComputerDTO {
    private Long id;
    private ComputerListDTO computer;
    private Integer price;
    private Integer count;
}
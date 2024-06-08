package com.example.back.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ComputerOneDTO {
    private Long id;
    private String name;
    private Integer price;
    private byte[] img;
    private List<ProductDTO> products;
}
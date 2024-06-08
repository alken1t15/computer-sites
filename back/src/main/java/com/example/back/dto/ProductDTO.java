package com.example.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    private String name;
    private Integer price;
    private byte[] img;
    private String description;
}
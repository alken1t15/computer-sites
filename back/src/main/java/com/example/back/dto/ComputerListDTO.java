package com.example.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ComputerListDTO {
    private Long id;
    private String name;
    private Integer price;
    private byte[] img;
}
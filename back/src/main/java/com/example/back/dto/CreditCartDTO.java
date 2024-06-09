package com.example.back.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreditCartDTO {
    private Long id;
    private String number;
    private String date;
    private String security;
    private String name;
}

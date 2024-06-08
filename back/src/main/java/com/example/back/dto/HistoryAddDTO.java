package com.example.back.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HistoryAddDTO {
    @NotNull
    @NotEmpty
    private String number;
    @NotNull
    @NotEmpty
    private String date;
    @NotNull
    @NotEmpty
    private String security;
    @NotNull
    @NotEmpty
    private String name;
    @NotNull
    @NotEmpty
    private String address;
}
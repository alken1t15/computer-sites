package com.example.back.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginAuth {
    private String email;
    private String password;
    private LocalDate date;
}
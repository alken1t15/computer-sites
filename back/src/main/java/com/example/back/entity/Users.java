package com.example.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String phone;
    private String name;
    private String jwt;

    @OneToMany(mappedBy = "user")
    private List<HistoryOrder> historyOrders;
    @OneToMany(mappedBy = "user")
    private List<Cart> carts;

    public Users(String email, String password, String phone, String name) {
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.name = name;
    }
}
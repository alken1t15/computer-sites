package com.example.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "credit_cart")
@Getter
@Setter
@NoArgsConstructor
public class CreditCart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String number;
    private String date;
    private String security;
    private String name;
    @OneToMany(mappedBy = "creditCart")
    private List<HistoryOrder> historyOrders;
}
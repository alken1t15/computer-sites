package com.example.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "history_order")
@NoArgsConstructor
public class HistoryOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users user;
    @ManyToOne
    @JoinColumn(name = "credit_cart_id")
    private CreditCart creditCart;
    @Column(name = "total_price")
    private Integer totalPrice;
    private LocalDateTime date;
    private String address;
    @OneToMany(mappedBy = "historyOrder",cascade = CascadeType.ALL)
    private List<OrderComputer> orderComputers;

    public HistoryOrder(String name, Users user, CreditCart creditCart, Integer totalPrice, LocalDateTime date, String address) {
        this.name = name;
        this.user = user;
        this.creditCart = creditCart;
        this.totalPrice = totalPrice;
        this.date = date;
        this.address = address;
    }
}
package com.example.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "cart_computer")
@NoArgsConstructor
public class CartComputer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "computer_id")
    private Computer computer;
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;
    private Integer price;
    private Integer count;

    public CartComputer(Computer computer, Cart cart, Integer price, Integer count) {
        this.computer = computer;
        this.cart = cart;
        this.price = price;
        this.count = count;
    }
}

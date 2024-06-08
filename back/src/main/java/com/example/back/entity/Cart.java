package com.example.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "cart")
@NoArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
    @Column(name = "total_price")
    private Integer totalPrice;
    @OneToMany(mappedBy = "cart",cascade = CascadeType.ALL)
    private List<CartComputer> cartComputers;

    public Cart(Users user, Integer totalPrice) {
        this.user = user;
        this.totalPrice = totalPrice;
    }
}
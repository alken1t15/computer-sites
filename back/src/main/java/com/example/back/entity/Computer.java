package com.example.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@Table(name = "computer")
@NoArgsConstructor
public class Computer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer price;
    private String img;
    private Float weight ;

    @ManyToMany
    @JoinTable(
            name = "computer_product",
            joinColumns = @JoinColumn(name = "computer_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products;

    @OneToMany(mappedBy = "computer")
    private List<OrderComputer> orderComputers;
    @OneToMany(mappedBy = "computer")
    private List<CartComputer> cartComputers;

    public Computer(String name, Integer price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Computer computer = (Computer) o;
        return Objects.equals(name, computer.name) && Objects.equals(price, computer.price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, price);
    }
}
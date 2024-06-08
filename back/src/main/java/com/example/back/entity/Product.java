package com.example.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "product")
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer price;
    private String img;
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany(mappedBy = "products")
    private List<Computer> computers;
}
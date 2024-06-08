package com.example.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "order_computer")
public class OrderComputer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "history_order_id")
    private HistoryOrder historyOrder;
    @ManyToOne
    @JoinColumn(name = "computer_id")
    private Computer computer;
    @Column(name = "total_price")
    private Integer price;
    private Integer count;
}

package com.example.back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "order_computer")
@NoArgsConstructor
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
    private Integer price;
    private Integer count;

    public OrderComputer(HistoryOrder historyOrder, Computer computer, Integer price, Integer count) {
        this.historyOrder = historyOrder;
        this.computer = computer;
        this.price = price;
        this.count = count;
    }
}

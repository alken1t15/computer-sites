package com.example.back.dto;

import com.example.back.entity.CreditCart;
import com.example.back.entity.OrderComputer;
import com.example.back.entity.Users;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class HistoryOrderDTO {
    private Long id;
    private String name;
    private CreditCartDTO creditCart;
    private Integer totalPrice;
    private LocalDateTime date;
    private String address;
    private List<OrderComputerDTO> orderComputers;
}

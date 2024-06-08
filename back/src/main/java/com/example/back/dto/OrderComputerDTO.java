package com.example.back.dto;

import com.example.back.entity.Computer;
import com.example.back.entity.HistoryOrder;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderComputerDTO {
    private Long id;
    private ComputerListDTO computer;
    private Integer price;
    private Integer count;
}
package com.example.back.dto;

import com.example.back.entity.CartComputer;
import com.example.back.entity.Users;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartDTO {
    private Long id;
    private Integer totalPrice;
    private List<CartComputerDTO> cartComputers;
}

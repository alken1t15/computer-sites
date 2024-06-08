package com.example.back.controller;

import com.example.back.dto.CartAddDTO;
import com.example.back.dto.CartEditCountDTO;
import com.example.back.service.ServiceCart;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cart")
@AllArgsConstructor
public class ControllerCart {
    private final ServiceCart serviceCart;

    @PostMapping("/add")
    public ResponseEntity addComputer(@Validated @RequestBody CartAddDTO cartAddDTO, BindingResult bindingResult) {
        return serviceCart.addComputer(cartAddDTO, bindingResult);
    }

    @PostMapping("/count")
    public ResponseEntity addEditCount(@Validated @RequestBody CartEditCountDTO cartEditCountDTO, BindingResult bindingResult) {
        return serviceCart.addEditCount(cartEditCountDTO, bindingResult);
    }

    @PostMapping("/")
    public ResponseEntity getCart(){
        return serviceCart.getCart();
    }
}
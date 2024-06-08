package com.example.back.service;

import com.example.back.dto.CartComputerDTO;
import com.example.back.dto.CartDTO;
import com.example.back.entity.Cart;
import com.example.back.entity.CartComputer;
import com.example.back.entity.HistoryOrder;
import com.example.back.entity.Users;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
@RequestMapping("/history")
public class ServiceHistoryOrder {
    private final ServiceUser serviceUser;

    public ResponseEntity getHistory() {
        Users user = serviceUser.getUser();
        List<HistoryOrder> historyOrders = user.getHistoryOrders();
        if (historyOrders.isEmpty()){
            return new ResponseEntity(HttpStatus.OK);
        }
        List<CartComputerDTO> cartComputerDTOS = new ArrayList<>();
        CartDTO cartDTO = null;
//        for (Cart cart : carts) {
//            List<CartComputer> cartComputers = cart.getCartComputers();
//            for (CartComputer cartComputer : cartComputers) {
//                CartComputerDTO cartComputerDTO = modelMapper.map(cartComputer, CartComputerDTO.class);
//                cartComputerDTO.getComputer().setImg(serviceImg.getFile(cartComputer.getComputer().getImg()));
//                cartComputerDTOS.add(cartComputerDTO);
//            }
//            cartDTO = modelMapper.map(cart, CartDTO.class);
//        }
        cartDTO.setCartComputers(cartComputerDTOS);
        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
    }
}

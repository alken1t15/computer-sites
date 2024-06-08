package com.example.back.service;

import com.example.back.dto.*;
import com.example.back.entity.*;
import com.example.back.repository.RepositoryCart;
import com.example.back.repository.RepositoryCreditCart;
import com.example.back.repository.RepositoryHistoryOrder;
import com.example.back.repository.RepositoryOrderComputer;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
@RequestMapping("/history")
public class ServiceHistoryOrder {
    private final ServiceUser serviceUser;
    private final ModelMapper modelMapper;
    private final ServiceImg serviceImg;
    private final RepositoryHistoryOrder repositoryHistoryOrder;
    private final RepositoryCreditCart repositoryCreditCart;
    private final RepositoryOrderComputer repositoryOrderComputer;
    private final RepositoryCart repositoryCart;

    public ResponseEntity getHistory() {
        Users user = serviceUser.getUser();
        List<HistoryOrder> historyOrders = user.getHistoryOrders();
        if (historyOrders.isEmpty()) {
            return new ResponseEntity(HttpStatus.OK);
        }
        List<OrderComputerDTO> orderComputerDTOS = new ArrayList<>();
        HistoryOrderDTO historyOrderDTO = null;
        for (HistoryOrder historyOrder : historyOrders) {
            List<OrderComputer> orderComputers = historyOrder.getOrderComputers();
            for (OrderComputer orderComputer : orderComputers) {
                OrderComputerDTO orderComputerDTO = modelMapper.map(orderComputer, OrderComputerDTO.class);
                orderComputerDTO.getComputer().setImg(serviceImg.getFile(orderComputer.getComputer().getImg()));
                orderComputerDTOS.add(orderComputerDTO);
            }
            historyOrderDTO = modelMapper.map(historyOrder, HistoryOrderDTO.class);
        }
        historyOrderDTO.setOrderComputers(orderComputerDTOS);
        return new ResponseEntity<>(historyOrderDTO, HttpStatus.OK);
    }

    public ResponseEntity addHistory(HistoryAddDTO historyAddDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String field = fieldError.getField();
                String nameError = fieldError.getDefaultMessage();
                errors.add(String.format("Поле %s ошибка: %s", field, nameError));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        Users user = serviceUser.getUser();
        Random random = new Random();
        int randomIntInRange = random.nextInt(1000001);
        CreditCart creditCart = repositoryCreditCart.save(new CreditCart(historyAddDTO.getNumber(),historyAddDTO.getDate(),historyAddDTO.getSecurity(),historyAddDTO.getName()));
        HistoryOrder historyOrder = repositoryHistoryOrder.save(new HistoryOrder(String.valueOf(randomIntInRange),user,creditCart,0, LocalDateTime.now(),historyAddDTO.getAddress()));
        List<Cart> carts = user.getCarts();
        for (Cart cart : carts){
            List<CartComputer> cartComputers = cart.getCartComputers();
            for (CartComputer cartComputer : cartComputers){
                repositoryOrderComputer.save(new OrderComputer(historyOrder,cartComputer.getComputer(),cartComputer.getPrice(),cartComputer.getCount()));
            }
            historyOrder.setTotalPrice(cart.getTotalPrice());
            repositoryHistoryOrder.save(historyOrder);
            repositoryCart.delete(cart);
        }
        return new ResponseEntity(HttpStatus.OK);
    }
}
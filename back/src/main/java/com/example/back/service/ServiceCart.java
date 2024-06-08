package com.example.back.service;

import com.example.back.dto.CartAddDTO;
import com.example.back.dto.CartComputerDTO;
import com.example.back.dto.CartDTO;
import com.example.back.dto.CartEditCountDTO;
import com.example.back.entity.Cart;
import com.example.back.entity.CartComputer;
import com.example.back.entity.Computer;
import com.example.back.entity.Users;
import com.example.back.repository.RepositoryCart;
import com.example.back.repository.RepositoryCartComputer;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@AllArgsConstructor
public class ServiceCart {
    private final RepositoryCart repositoryCart;
    private final ServiceComputer serviceComputer;
    private final ServiceUser serviceUser;
    private final RepositoryCartComputer repositoryCartComputer;
    private final ModelMapper modelMapper;
    private final ServiceImg serviceImg;


    public ResponseEntity addComputer(CartAddDTO cartAddDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String field = fieldError.getField();
                String nameError = fieldError.getDefaultMessage();
                errors.add(String.format("Поле %s ошибка: %s", field, nameError));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        Computer computer = serviceComputer.findById(cartAddDTO.getId());
        if (computer == null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        Users user = serviceUser.getUser();
        List<Cart> carts = user.getCarts();
        if (carts.isEmpty()) {
            Cart c = repositoryCart.save(new Cart(user, 0));
            CartComputer cartComputer = repositoryCartComputer.save(new CartComputer(computer, c, computer.getPrice(), 1));
            c.setTotalPrice(cartComputer.getPrice());
            repositoryCart.save(c);
        } else {
            for (Cart c : carts) {
                List<CartComputer> cartComputers = c.getCartComputers();
                int total = 0;
                boolean add = false;
                for (CartComputer cartComputer : cartComputers) {
                    if (cartComputer.getComputer().getId() == cartAddDTO.getId()) {
                        cartComputer.setCount(cartComputer.getCount() + 1);
                        cartComputer.setPrice(cartComputer.getComputer().getPrice() * cartComputer.getCount());
                        repositoryCartComputer.save(cartComputer);
                        add = true;
                    }
                    total += cartComputer.getPrice();
                }
                c.setTotalPrice(total);
                repositoryCart.save(c);
                if (add) {

                } else {
                    repositoryCartComputer.save(new CartComputer(computer, c, computer.getPrice(), 1));
                }
            }
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity addEditCount(CartEditCountDTO cartEditCountDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String field = fieldError.getField();
                String nameError = fieldError.getDefaultMessage();
                errors.add(String.format("Поле %s ошибка: %s", field, nameError));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        Computer computer = serviceComputer.findById(cartEditCountDTO.getId());
        if (computer == null) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        Users user = serviceUser.getUser();
        List<Cart> carts = user.getCarts();
        for (Cart c : carts) {
            List<CartComputer> cartComputers = c.getCartComputers();
            int total = 0;
            boolean add = false;
            boolean delete = false;
            for (CartComputer cartComputer : cartComputers) {
                if (cartComputer.getComputer().getId() == cartEditCountDTO.getId()) {
                    if (cartEditCountDTO.getName().equals("+")) {
                        cartComputer.setCount(cartComputer.getCount() + 1);
                    } else if (cartEditCountDTO.getName().equals("-")) {
                        if (cartComputer.getCount() - 1 == 0) {
                            repositoryCartComputer.delete(cartComputer);
                            cartComputers.remove(cartComputer);
                            delete = true;
                            break;
                        } else {
                            cartComputer.setCount(cartComputer.getCount() - 1);
                        }
                    }
                    cartComputer.setPrice(cartComputer.getComputer().getPrice() * cartComputer.getCount());
                    repositoryCartComputer.save(cartComputer);
                    add = true;
                }
                total += cartComputer.getPrice();
            }
            if (cartComputers.isEmpty()) {
                repositoryCart.delete(c);
                break;
            } else {
                if (delete) {
                    cartComputers = c.getCartComputers();
                    for (CartComputer cartComputer : cartComputers) {
                        if (cartComputer.getComputer().getId() == cartEditCountDTO.getId()) {
                            if (cartEditCountDTO.getName().equals("+")) {
                                cartComputer.setCount(cartComputer.getCount() + 1);
                            } else if (cartEditCountDTO.getName().equals("-")) {
                                if (cartComputer.getCount() - 1 == 0) {
                                    repositoryCartComputer.delete(cartComputer);
                                    cartComputers.remove(cartComputer);
                                    delete = true;
                                    break;
                                } else {
                                    cartComputer.setCount(cartComputer.getCount() - 1);
                                }
                            }
                            cartComputer.setPrice(cartComputer.getComputer().getPrice() * cartComputer.getCount());
                            repositoryCartComputer.save(cartComputer);
                            add = true;
                        }
                        total += cartComputer.getPrice();
                    }
                }
                c.setTotalPrice(total);
                repositoryCart.save(c);

            }
            if (add) {

            } else {
                repositoryCartComputer.save(new CartComputer(computer, c, computer.getPrice(), 1));
            }
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity getCart() {
        Users user = serviceUser.getUser();
        List<Cart> carts = user.getCarts();
        if (carts.isEmpty()){
            return new ResponseEntity(HttpStatus.OK);
        }
        List<CartComputerDTO> cartComputerDTOS = new ArrayList<>();
        CartDTO cartDTO = null;
        for (Cart cart : carts) {
            List<CartComputer> cartComputers = cart.getCartComputers();
            for (CartComputer cartComputer : cartComputers) {
                CartComputerDTO cartComputerDTO = modelMapper.map(cartComputer, CartComputerDTO.class);
                cartComputerDTO.getComputer().setImg(serviceImg.getFile(cartComputer.getComputer().getImg()));
                cartComputerDTOS.add(cartComputerDTO);
            }
            cartDTO = modelMapper.map(cart, CartDTO.class);
        }
        cartDTO.setCartComputers(cartComputerDTOS);
        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
    }
}
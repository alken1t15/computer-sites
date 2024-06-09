package com.example.back.service;

import com.example.back.dto.ComputerAddDTO;
import com.example.back.dto.ComputerListDTO;
import com.example.back.dto.ComputerOneDTO;
import com.example.back.dto.ProductDTO;
import com.example.back.entity.Computer;
import com.example.back.entity.Product;
import com.example.back.repository.RepositoryComputer;
import com.example.back.repository.RepositoryProduct;
import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
public class ServiceComputer {
    private final RepositoryComputer repositoryComputer;
    private final ServiceImg serviceImg;
    private final ModelMapper modelMapper;
    private final RepositoryProduct repositoryProduct;


    public ResponseEntity getAllComputer(String name) {
        List<Computer> computers;
        if (StringUtils.isBlank(name)) {
            computers = repositoryComputer.findAll();
        } else {
            List<Computer> arr = new ArrayList<>();
            Set<Computer> set = new HashSet<>(arr);
            computers = repositoryComputer.findByStartName(name);
            set.addAll(computers);
            computers = repositoryComputer.findByBetweenName(name);
            set.addAll(computers);
            computers = repositoryComputer.findByEndName(name);
            set.addAll(computers);
            computers = new ArrayList<>(set);
        }
        List<ComputerListDTO> computerListDTOS = new ArrayList<>();
        for (Computer c : computers) {
            ComputerListDTO computerListDTO = modelMapper.map(c, ComputerListDTO.class);
            computerListDTO.setImg(serviceImg.getFile(c.getImg()));
            computerListDTOS.add(computerListDTO);
        }
        return new ResponseEntity(computerListDTOS, HttpStatus.OK);
    }

    public ResponseEntity findByIdComputer(Long id) {
        Computer computer = repositoryComputer.findById(id).orElse(null);
        if (computer==null){
            return new ResponseEntity<>("Нету такого товара с таким id", HttpStatus.BAD_REQUEST);
        }
        List<Product> products = computer.getProducts();
        List<ProductDTO> productDTOS = new ArrayList<>();
        for (Product p : products){
            ProductDTO productDTO = modelMapper.map(p, ProductDTO.class);
            productDTO.setImg(serviceImg.getFile(p.getImg()));
            productDTOS.add(productDTO);
        }
        ComputerOneDTO computerOneDTO = modelMapper.map(computer,ComputerOneDTO.class);
        computerOneDTO.setImg(serviceImg.getFile(computer.getImg()));
        computerOneDTO.setProducts(productDTOS);
        return new ResponseEntity(computerOneDTO,HttpStatus.OK);
    }


    public Computer findById(Long id){
        return repositoryComputer.findById(id).orElse(null);
    }

    public ResponseEntity addNewComputer(ComputerAddDTO computerAddDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String field = fieldError.getField();
                String nameError = fieldError.getDefaultMessage();
                errors.add(String.format("Поле %s ошибка: %s", field, nameError));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        Computer computer = repositoryComputer.save(new Computer(computerAddDTO.getName(),0));
        List<Product> products = new ArrayList<>();
        computer.setProducts(products);
        int price = 0;
        for (Long id : computerAddDTO.getIdProducts()){
            Product product = repositoryProduct.findById(id).orElseThrow();
            computer.getProducts().add(product);
            computer.setProducts(computer.getProducts());
            price+= product.getPrice();
            repositoryComputer.save(computer);
        }
        computer.setPrice(price);
        computer.setImg("1.png");
        repositoryComputer.save(computer);
        return new ResponseEntity(HttpStatus.OK);
    }
}

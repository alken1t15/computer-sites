package com.example.back.service;

import com.example.back.dto.ComputerListDTO;
import com.example.back.dto.ComputerOneDTO;
import com.example.back.dto.ProductDTO;
import com.example.back.entity.Computer;
import com.example.back.entity.Product;
import com.example.back.repository.RepositoryComputer;
import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ServiceComputer {
    private final RepositoryComputer repositoryComputer;
    private final ServiceImg serviceImg;
    private final ModelMapper modelMapper;


    public ResponseEntity getAllComputer(String name) {
        List<Computer> computers;
        if (StringUtils.isBlank(name)) {
            computers = repositoryComputer.findAll();
        } else {
            computers = repositoryComputer.findAllByNameLikeIgnoreCase(name);
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
}

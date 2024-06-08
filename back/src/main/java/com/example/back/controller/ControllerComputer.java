package com.example.back.controller;

import com.example.back.dto.ComputerAddDTO;
import com.example.back.service.ServiceComputer;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/computer")
@AllArgsConstructor
public class ControllerComputer {
    private ServiceComputer serviceComputer;

    @GetMapping("/")
    public ResponseEntity getMainPage(@RequestParam(required = false) String name) {
        return serviceComputer.getAllComputer(name);
    }

    @GetMapping("/{id}")
    public ResponseEntity getProductById(@Validated @NonNull @PathVariable Long id) {
       return serviceComputer.findByIdComputer(id);
    }

    @PostMapping("/add")
    public ResponseEntity addNewComputer(@Validated @RequestBody ComputerAddDTO computerAddDTO, BindingResult bindingResult) {
        return serviceComputer.addNewComputer(computerAddDTO,bindingResult);
    }
}

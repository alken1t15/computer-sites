package com.example.back.controller;

import com.example.back.service.ServiceCategory;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/category")
@AllArgsConstructor
public class ControllerCategory {
    private final ServiceCategory serviceCategory;

    @GetMapping("/")
    public ResponseEntity getCategory() {
        return serviceCategory.getCategory();
    }
}

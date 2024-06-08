package com.example.back.controller;

import com.example.back.service.ServiceHistoryOrder;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/history")
@AllArgsConstructor
public class ControllerHistory {
    private  ServiceHistoryOrder serviceHistoryOrder;

    @PostMapping("/")
    public ResponseEntity getHistory(){
        return serviceHistoryOrder.getHistory();
    }
}

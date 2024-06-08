package com.example.back.controller;

import com.example.back.dto.HistoryAddDTO;
import com.example.back.service.ServiceHistoryOrder;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PostMapping("/add")
    public ResponseEntity addHistory(@RequestBody @Validated HistoryAddDTO historyAddDTO, BindingResult bindingResult){
        return serviceHistoryOrder.addHistory(historyAddDTO,bindingResult);
    }
}

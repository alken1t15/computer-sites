package com.example.back.controller;

import com.example.back.dto.LoginAuth;
import com.example.back.dto.UsersAddDTO;
import com.example.back.entity.Users;
import com.example.back.repository.RepositoryUsers;
import com.example.back.security.JWTUtil;
import com.example.back.service.ServiceUser;
import io.micrometer.common.util.StringUtils;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/user")
@NoArgsConstructor
public class ControllerUser {
    private Logger logger = LoggerFactory.getLogger(ControllerUser.class);
    private JWTUtil jwtUtil;
    private AuthenticationManager authenticationManager;
    private ServiceUser serviceUser;

    @Autowired
    public ControllerUser(JWTUtil jwtUtil, AuthenticationManager authenticationManager, ServiceUser serviceUser) {
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.serviceUser = serviceUser;
    }

    @PostMapping("/jwt")
    public Map<String, Object> loginHandler(@RequestBody LoginAuth loginAuth) {
        if (StringUtils.isBlank(loginAuth.getEmail()) || StringUtils.isBlank(loginAuth.getPassword())) {
            throw new BadCredentialsException("Одно из полей пустое");
        }
        Authentication token;
        Authentication authenticationResponse;
        Users user;
        String jwt;
        logger.info(String.format("Авторизация пользователя: почта: %s пароль: %s", loginAuth.getEmail(), loginAuth.getPassword()));
        token = UsernamePasswordAuthenticationToken.unauthenticated(loginAuth.getEmail(), loginAuth.getPassword());
        authenticationResponse = this.authenticationManager.authenticate(token);
        user = serviceUser.findByEmail(loginAuth.getEmail()).orElseThrow();
        jwt = jwtUtil.generateToken(loginAuth.getEmail(), loginAuth.getPassword());
        logger.info(String.format("Пользователь который хочет получить jwt токен: %s", authenticationResponse));
        user.setJwt(jwt);
        serviceUser.save(user);
        logger.info(String.format("JWT: %s", jwt));
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("jwt-token", jwt);
        return hashMap;
    }

    @PostMapping("/add")
    private ResponseEntity addNewUser(@RequestBody @Validated UsersAddDTO user,BindingResult bindingResult){
       return serviceUser.addNewUser(user,bindingResult);
    }

    @GetMapping("/profile")
    private ResponseEntity getUser(){
        return serviceUser.getProfile();
    }


    @PostMapping("/edit")
    private ResponseEntity editUser(@RequestBody @Validated UsersAddDTO user,BindingResult bindingResult){
        return serviceUser.editUser(user,bindingResult);
    }
}
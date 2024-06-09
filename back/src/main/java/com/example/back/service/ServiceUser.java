package com.example.back.service;

import com.example.back.dto.UserDTO;
import com.example.back.dto.UsersAddDTO;
import com.example.back.entity.Users;
import com.example.back.repository.RepositoryUsers;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ServiceUser {
    private final RepositoryUsers repositoryUsers;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;


    public Optional<Users> findByEmail(String email) {
        return repositoryUsers.findByEmail(email);
    }

    public void save(Users user) {
        repositoryUsers.save(user);
    }

    public ResponseEntity addNewUser(UsersAddDTO user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String field = fieldError.getField();
                String nameError = fieldError.getDefaultMessage();
                errors.add(String.format("Поле %s ошибка: %s", field, nameError));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        Users users = findByEmail(user.getEmail()).orElse(null);
        if (users != null) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        } else {
            String newPassword = passwordEncoder.encode(user.getPassword());
            repositoryUsers.save(new Users(user.getEmail(), newPassword, user.getPhone(), user.getName()));
            return new ResponseEntity(HttpStatus.OK);
        }
    }

    public ResponseEntity getProfile() {
        Users user = getUser();
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
        return new ResponseEntity(userDTO, HttpStatus.OK);
    }

    public Users getUser() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return repositoryUsers.findByEmail(securityContext.getAuthentication().getName()).orElseThrow();
    }

    public ResponseEntity editUser(UsersAddDTO user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            List<String> errors = new ArrayList<>();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                String field = fieldError.getField();
                String nameError = fieldError.getDefaultMessage();
                errors.add(String.format("Поле %s ошибка: %s", field, nameError));
            }
            return new ResponseEntity(errors, HttpStatus.BAD_REQUEST);
        }
        Users users = getUser();
        users.setName(user.getName());
        users.setPhone(user.getPhone());
        users.setEmail(user.getEmail());
        String newPassword = passwordEncoder.encode(user.getPassword());
        users.setPassword(newPassword);
        return new ResponseEntity(HttpStatus.OK);
    }

    public ResponseEntity deleteUser() {
        Users user = getUser();
        repositoryUsers.delete(user);
        return new ResponseEntity(HttpStatus.OK);
    }
}
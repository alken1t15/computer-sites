package com.example.back.service;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class ServiceImg {
    @Value("${path.file}")
    private String pathSave;

    public byte[] getFile(String name) {
        byte[] file = new byte[0];
        try {
            file = Files.readAllBytes(Paths.get(pathSave + name));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return file;
    }
}

package com.example.back.service;

import com.example.back.dto.CategoryDTO;
import com.example.back.dto.ProductDTO;
import com.example.back.entity.Category;
import com.example.back.entity.Product;
import com.example.back.repository.RepositoryCategory;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ServiceCategory {
    private final RepositoryCategory repositoryCategory;
    private final ModelMapper modelMapper;

    public ResponseEntity getCategory() {
        List<Category> categories = repositoryCategory.findAll();
        List<CategoryDTO> categoryDTOS = new ArrayList<>();
        for (Category category : categories) {
            List<ProductDTO> productDTOS = null;
            for (Product product : category.getProducts()) {
                productDTOS = new ArrayList<>();
                productDTOS.add(modelMapper.map(product, ProductDTO.class));
            }
            CategoryDTO categoryDTO = new CategoryDTO(category.getName(), productDTOS);
            categoryDTOS.add(categoryDTO);
        }
        return new ResponseEntity(categoryDTOS, HttpStatus.OK);
    }
}

package com.example.back.security;

import com.example.back.entity.Users;
import com.example.back.repository.RepositoryUsers;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    private RepositoryUsers repositoryUser;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = repositoryUser.findByEmail(email).orElse(null);
        return new UserDetailsImp(user);
    }
}
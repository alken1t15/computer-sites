package com.example.back.security;

import com.example.back.dto.LoginAuth;
import com.example.back.entity.Users;
import com.example.back.service.ServiceUser;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDate;

@Component
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtil jwtUtil;
    private Logger logger = LoggerFactory.getLogger(JWTFilter.class);
    @Qualifier("authenticationManager")
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private AuthenticationManager authenticationManagerPhone;
    @Autowired
    private ServiceUser serviceUser;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String headerAuth = request.getHeader("Authorization");
        if (headerAuth != null) {
            String url = request.getRequestURL().toString();
            if (url.equals("http://localhost:8080/user/jwt")) {
                filterChain.doFilter(request, response);
                return;
            }
            if (headerAuth.startsWith("Bearer ")) {
                String token = headerAuth.substring(7);
                logger.info(String.format("JWT который был получен: %s", token));
                LoginAuth loginAuth = jwtUtil.validateTokenAndRetrieveSubject(token);
                if (loginAuth == null) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("Не правильный JWT токен");
                    response.setCharacterEncoding("UTF-8");
                    return;
                }
                String login = loginAuth.getEmail();
                String password = loginAuth.getPassword();
                LocalDate date = loginAuth.getDate();
                Authentication authentication;
                Authentication authenticationUser;
                logger.info(String.format("Данные полученные из JWT: почта: %s пароль: %s", login, password));
                authentication = new UsernamePasswordAuthenticationToken(login, password);
                authenticationUser = authenticationManager.authenticate(authentication);
                if (authenticationUser.isAuthenticated()) {
                    Users user = serviceUser.findByEmail(login).orElseThrow();
                    if (user.getJwt() == null) {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("Не правильный JWT токен");
                        response.setCharacterEncoding("UTF-8");
                        return;
                    }
                    if (!user.getJwt().equals(token)) {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("Истек срок JWT токен");
                        response.setCharacterEncoding("UTF-8");
                    } else if (date.isAfter(LocalDate.now())) {
                        SecurityContext securityContext = SecurityContextHolder.getContext();
                        securityContext.setAuthentication(authenticationUser);
                        SecurityContextHolder.setContext(securityContext);
                        filterChain.doFilter(request, response);
                    } else {
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                        response.getWriter().write("Истек срок JWT токен");
                        response.setCharacterEncoding("UTF-8");
                    }
                } else {
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    response.getWriter().write("Не правильный JWT токен");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().flush();
                    response.getWriter().close();
                }
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }
}
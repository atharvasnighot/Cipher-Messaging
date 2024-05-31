package com.cipher.backend.controller;

import com.cipher.backend.config.TokenProvider;
import com.cipher.backend.model.User;
import com.cipher.backend.repository.UserRepository;
import com.cipher.backend.request.LoginRequest;
import com.cipher.backend.response.AuthResponse;
import com.cipher.backend.service.CustomUserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private TokenProvider tokenProvider;

    @Mock
    private CustomUserService customUserService;

    @InjectMocks
    private AuthController authController;

    @Test
    void createUserHandler_ValidUser_Success() throws Exception {
        User user = new User(1, "John Doe", "john@example.com", "password", null);
        when(userRepository.findByEmail(user.getEmail())).thenReturn(null);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(tokenProvider.generateToken(any(Authentication.class))).thenReturn("jwtToken");

        ResponseEntity<AuthResponse> responseEntity = authController.createUserHandler(user);

        assertEquals(HttpStatus.ACCEPTED, responseEntity.getStatusCode());
        assertTrue(responseEntity.getBody().isAuth());
        assertEquals("jwtToken", responseEntity.getBody().getJwt());
    }

    @Test
    void createUserHandler_ExistingUser_ExceptionThrown() {
        User user = new User(1, "John Doe", "john@example.com", "password", null);
        when(userRepository.findByEmail(user.getEmail())).thenReturn(user);

        assertThrows(Exception.class, () -> authController.createUserHandler(user));
    }

    @Test
    void loginHandler_ValidCredentials_Success() {
        LoginRequest loginRequest = new LoginRequest("john@example.com", "password");
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                "john@example.com", "password", AuthorityUtils.createAuthorityList("ROLE_USER"));
        when(customUserService.loadUserByUsername(loginRequest.getEmail())).thenReturn(userDetails);
        when(tokenProvider.generateToken(any(Authentication.class))).thenReturn("jwtToken");

        ResponseEntity<AuthResponse> responseEntity = authController.loginHandler(loginRequest);

        assertEquals(HttpStatus.ACCEPTED, responseEntity.getStatusCode());
        assertTrue(responseEntity.getBody().isAuth());
        assertEquals("jwtToken", responseEntity.getBody().getJwt());
    }

    @Test
    void loginHandler_InvalidUsername_ExceptionThrown() {
        LoginRequest loginRequest = new LoginRequest("john@example.com", "password");
        when(customUserService.loadUserByUsername(loginRequest.getEmail())).thenThrow(UsernameNotFoundException.class);

        assertThrows(UsernameNotFoundException.class, () -> authController.loginHandler(loginRequest));
    }

}

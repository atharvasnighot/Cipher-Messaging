package com.cipher.backend.response;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AuthResponse {

    private String jwt;
    private boolean isAuth;

}

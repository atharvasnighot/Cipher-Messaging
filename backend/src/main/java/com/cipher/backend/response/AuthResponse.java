package com.cipher.backend.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String jwt;
    private boolean isAuth;

}

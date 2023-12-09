package com.cipher.backend.controller;

import com.cipher.backend.config.TokenProvider;
import com.cipher.backend.model.User;
import com.cipher.backend.repository.UserRepository;
import com.cipher.backend.request.LoginRequest;
import com.cipher.backend.response.AuthResponse;
import com.cipher.backend.service.CustomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private CustomUserService customUserService;

    @PostMapping(value = "/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {
        String email = user.getEmail();
        String fullName = user.getFull_name();
        String password = user.getPassword();

        User isUser = userRepository.findByEmail(email);
        if (isUser != null)
            throw new Exception("Email Id already registered");

        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setFull_name(fullName);
        createdUser.setPassword(passwordEncoder.encode(password));
        userRepository.save(createdUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        AuthResponse response = AuthResponse.builder()
                .jwt(jwt)
                .isAuth(true)
                .build();
        System.out.println("Email Registered");
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest request){
        String email = request.getEmail();
        String password = request.getPassword();

        Authentication authentication = authenticate(email, password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        AuthResponse response = new AuthResponse(jwt, true);

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    public Authentication authenticate(String username, String password){

        UserDetails userDetails =  customUserService.loadUserByUsername(username);

        if (userDetails == null)
            throw new BadCredentialsException("Invalid Username or Password");

        if (!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Invalid Password or Username");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

    }
}

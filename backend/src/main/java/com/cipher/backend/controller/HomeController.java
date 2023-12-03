package com.cipher.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<String> HomeController(){
        System.out.println("HomeController");
        return new ResponseEntity<String>("Welcome to Cipher", HttpStatus.OK);
    }

}

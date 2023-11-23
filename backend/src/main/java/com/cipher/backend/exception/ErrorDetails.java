package com.cipher.backend.exception;

import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
public class ErrorDetails {

    private String error;
    private String message;
    private LocalDateTime timeStamp;

}

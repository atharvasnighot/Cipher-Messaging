package com.cipher.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorDetails> userExceptionHandler(UserException e, WebRequest req){

        ErrorDetails errorDetails = new ErrorDetails(e.getMessage(), req.getDescription(false), LocalDateTime.now());
        return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.BAD_REQUEST);
    }

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<ErrorDetails> otherExceptionHandler(Exception e, WebRequest req){
//
//        ErrorDetails errorDetails = new ErrorDetails(e.getMessage(), req.getDescription(false), LocalDateTime.now());
//        return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.BAD_REQUEST);
//    }

    @ExceptionHandler(MessageException.class)
    public ResponseEntity<ErrorDetails> MessageExceptionHandler(MessageException messageException, WebRequest request){

        ErrorDetails errorDetails = new ErrorDetails(messageException.getMessage(), request.getDescription(false), LocalDateTime.now());
        return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ChatException.class)
    public ResponseEntity<ErrorDetails> ChatExceptionHandler(ChatException chatException, WebRequest request){

        ErrorDetails errorDetails = new ErrorDetails(chatException.getMessage(), request.getDescription(false), LocalDateTime.now());
        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDetails> MethodArgumentNotValidExceptionHandler(MethodArgumentNotValidException exception, WebRequest request){

        String error = exception.getBindingResult().getFieldError().getDefaultMessage();
        ErrorDetails errorDetails = new ErrorDetails("Validation Error", error, LocalDateTime.now());

        return  new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorDetails> handleNoHandlerFoundException(NoHandlerFoundException exception, WebRequest request){
        ErrorDetails errorDetails = new ErrorDetails("Endpoint not found", exception.getMessage(), LocalDateTime.now());
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }
}

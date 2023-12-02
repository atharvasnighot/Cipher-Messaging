package com.cipher.backend.controller;

import com.cipher.backend.exception.ChatException;
import com.cipher.backend.exception.MessageException;
import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.Message;
import com.cipher.backend.model.User;
import com.cipher.backend.request.SendMessageRequest;
import com.cipher.backend.response.ApiResponse;
import com.cipher.backend.service.MessageService;
import com.cipher.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Message> sendMessageHandler(@RequestBody SendMessageRequest request, @RequestHeader("Authorization") String jwt) throws UserException, ChatException {

        User user = userService.findUserProfile(jwt);

        request.setUserId(user.getId());
        Message message = messageService.sendMessage(request);

        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/chat/{chatId}")
    public ResponseEntity<List<Message>> getChatMessagesHandler(@PathVariable Integer chatId , @RequestHeader("Authorization") String jwt) throws UserException, ChatException {

        User user = userService.findUserProfile(jwt);
        List<Message> messages = messageService.getChatMessages(chatId, user);

        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @DeleteMapping("/{messageId}")
    public ResponseEntity<ApiResponse> deleteMessagesHandler(@PathVariable Integer messageId , @RequestHeader("Authorization") String jwt) throws UserException, MessageException {

        User user = userService.findUserProfile(jwt);
        messageService.deleteMessage(messageId, user);

        ApiResponse response = new ApiResponse("Message Deleted Successfully", false);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}

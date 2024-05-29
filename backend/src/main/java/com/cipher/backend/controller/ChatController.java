package com.cipher.backend.controller;

import com.cipher.backend.exception.ChatException;
import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.Chat;
import com.cipher.backend.model.User;
import com.cipher.backend.request.SingleChatRequest;
import com.cipher.backend.response.ApiResponse;
import com.cipher.backend.service.ChatService;
import com.cipher.backend.request.GroupChatRequest;
import com.cipher.backend.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
@Slf4j
@Validated
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping("/single")
    public ResponseEntity<Chat> createChatHandler(@Valid @RequestBody SingleChatRequest singleChatRequest, @RequestHeader("Authorization") String jwt) throws UserException {
        log.info("Creating single chat with user ID: {}", singleChatRequest.getUserId());
        User requestUser = userService.findUserProfile(jwt);
        Chat chat = chatService.createChat(requestUser, singleChatRequest.getUserId());
        log.info("Single chat created successfully with chat ID: {}", chat.getId());
        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @PostMapping("/group")
    public ResponseEntity<Chat> createGroupHandler(@Valid @RequestBody GroupChatRequest groupChatRequest, @RequestHeader("Authorization") String jwt) throws UserException {
        log.info("Creating group chat with group name: {}", groupChatRequest.getChat_name());
        User requestUser = userService.findUserProfile(jwt);
        Chat chat = chatService.createGroup(groupChatRequest, requestUser);
        log.info("Group chat created successfully with chat ID: {}", chat.getId());
        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<Chat> findChatByIdHandler(@PathVariable @NotNull Integer chatId, @RequestHeader("Authorization") String jwt) throws ChatException {
        log.info("Finding chat with chat ID: {}", chatId);
        Chat chat = chatService.findChatById(chatId);
        log.info("Chat found with chat ID: {}", chat.getId());
        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Chat>> findAllChatsByUserId(@RequestHeader("Authorization") String jwt) throws UserException {
        log.info("Finding all chats for user with token: {}", jwt);
        User requestUser = userService.findUserProfile(jwt);
        List<Chat> chats = chatService.findAllChatsByUserId(requestUser.getId());
        log.info("Found {} chats for user ID: {}", chats.size(), requestUser.getId());
        return new ResponseEntity<>(chats, HttpStatus.OK);
    }

    @PutMapping("/{chatId}/add/{userId}")
    public ResponseEntity<Chat> addUserToGroupHandler(@PathVariable @NotNull Integer chatId, @PathVariable @NotNull Integer userId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException, UserException {
        log.info("Adding user ID: {} to chat ID: {}", userId, chatId);
        User requestUser = userService.findUserProfile(jwt);
        Chat chat = chatService.addUserToGroup(userId, chatId, requestUser);
        log.info("User ID: {} added to chat ID: {}", userId, chatId);
        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @PutMapping("/{chatId}/remove/{userId}")
    public ResponseEntity<Chat> removeUserFromGroupHandler(@PathVariable @NotNull Integer chatId, @PathVariable @NotNull Integer userId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException {
        log.info("Removing user ID: {} from chat ID: {}", userId, chatId);
        User requestUser = userService.findUserProfile(jwt);
        Chat chat = chatService.removeFromGroup(userId, chatId, requestUser);
        log.info("User ID: {} removed from chat ID: {}", userId, chatId);
        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{chatId}")
    public ResponseEntity<ApiResponse> deleteChatHandler(@PathVariable @NotNull Integer chatId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException {
        log.info("Deleting chat with chat ID: {}", chatId);
        User requestUser = userService.findUserProfile(jwt);
        chatService.deleteChat(chatId, requestUser.getId());
        ApiResponse response = new ApiResponse("Chat Deleted", false);
        log.info("Chat with chat ID: {} deleted successfully", chatId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}


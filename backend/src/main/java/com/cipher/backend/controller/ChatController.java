package com.cipher.backend.controller;

import com.cipher.backend.exception.ChatException;
import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.Chat;
import com.cipher.backend.model.User;
import com.cipher.backend.request.SingleChatRequest;
import com.cipher.backend.response.ApiResponse;
import com.cipher.backend.service.ChatService;
import com.cipher.backend.service.GroupChatRequest;
import com.cipher.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping("/single")
    public ResponseEntity<Chat> createChatHandler(@RequestBody SingleChatRequest singleChatRequest, @RequestHeader("Authorization") String jwt) throws UserException {

        User requestUser = userService.findUserProfile(jwt);
        Chat chat = chatService.createChat(requestUser, singleChatRequest.getUserId());

        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @PostMapping("/group")
    public ResponseEntity<Chat> createGroupHandler(@RequestBody GroupChatRequest groupChatRequest, @RequestHeader("Authorization") String jwt) throws UserException {

        User requestUser = userService.findUserProfile(jwt);
        Chat chat = chatService.createGroup(groupChatRequest, requestUser);
        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<Chat> findChatByIdHandler(@RequestBody Integer chatId, @RequestHeader("Authorization") String jwt) throws ChatException {
        Chat chat = chatService.findChatById(chatId);
        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Chat>> findAllChatsByUserId(@RequestHeader("Authorization") String jwt) throws UserException {

        User requestUser = userService.findUserProfile(jwt);
        List<Chat> chats = chatService.findAllChatByUserId(requestUser.getId());

        return new ResponseEntity<>(chats, HttpStatus.OK);
    }

    @PutMapping("/{chatId}/add/{userId}")
    public ResponseEntity<Chat> addUserToGroupHandler(@PathVariable Integer chatId, @PathVariable Integer userId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException {

        User requestUser = userService.findUserProfile(jwt);
        Chat chat = chatService.addUserToGroup(userId, chatId, requestUser);

        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @PutMapping("/{chatId}/remove/{userId}")
    public ResponseEntity<Chat> removeUserToGroupHandler(@PathVariable Integer chatId, @PathVariable Integer userId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException {

        User requestUser = userService.findUserProfile(jwt);
        Chat chat = chatService.removeFromGroup(userId, chatId, requestUser);

        return new ResponseEntity<>(chat, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{chatId}")
    public ResponseEntity<ApiResponse> deleteChatHandler(@PathVariable Integer chatId, @RequestHeader("Authorization") String jwt) throws UserException, ChatException {

        User requestUser = userService.findUserProfile(jwt);
        chatService.deleteChat(chatId, requestUser.getId());
        ApiResponse response = new ApiResponse("Chat Deleted", false);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}

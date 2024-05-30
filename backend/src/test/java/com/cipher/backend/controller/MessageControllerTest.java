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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

public class MessageControllerTest {

    @Mock
    private MessageService messageService;

    @Mock
    private UserService userService;

    @InjectMocks
    private MessageController messageController;

    private User user;
    private Message message;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setId(1);
        user.setEmail("test@example.com");
        message = new Message();
        message.setId(1);
        message.setContent("Test Message");
    }

    @Test
    void sendMessageHandler_Success() throws UserException, ChatException {
        SendMessageRequest sendMessageRequest = new SendMessageRequest();
        sendMessageRequest.setChatId(1);
        sendMessageRequest.setContent("Hello");

        when(userService.findUserProfile(anyString())).thenReturn(user);
        when(messageService.sendMessage(any(SendMessageRequest.class))).thenReturn(message);

        ResponseEntity<Message> response = messageController.sendMessageHandler(sendMessageRequest, "Bearer token");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(message, response.getBody());
        verify(messageService).sendMessage(any(SendMessageRequest.class));
    }

    @Test
    void getChatMessagesHandler_Success() throws UserException, ChatException {
        List<Message> messages = Arrays.asList(message);
        when(userService.findUserProfile(anyString())).thenReturn(user);
        when(messageService.getChatMessages(anyInt(), any(User.class))).thenReturn(messages);

        ResponseEntity<List<Message>> response = messageController.getChatMessagesHandler(1, "Bearer token");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(messages, response.getBody());
        verify(messageService).getChatMessages(anyInt(), any(User.class));
    }

    @Test
    void deleteMessagesHandler_Success() throws UserException, MessageException {
        when(userService.findUserProfile(anyString())).thenReturn(user);
        doNothing().when(messageService).deleteMessage(anyInt(), any(User.class));

        ResponseEntity<ApiResponse> response = messageController.deleteMessagesHandler(1, "Bearer token");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(messageService).deleteMessage(anyInt(), any(User.class));
    }
}

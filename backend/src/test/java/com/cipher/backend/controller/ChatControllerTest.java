package com.cipher.backend.controller;
import org.junit.jupiter.api.Test;
import com.cipher.backend.exception.ChatException;
import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.Chat;
import com.cipher.backend.model.User;
import com.cipher.backend.request.GroupChatRequest;
import com.cipher.backend.request.SingleChatRequest;
import com.cipher.backend.response.ApiResponse;
import com.cipher.backend.service.ChatService;
import com.cipher.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ChatControllerTest {

    @Mock
    private ChatService chatService;

    @Mock
    private UserService userService;

    @InjectMocks
    private ChatController chatController;

    private User user;
    private Chat chat;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setId(1);
        user.setEmail("test@example.com");
        chat = new Chat();
        chat.setId(1);
        chat.setChat_name("Test Chat");
    }

    @Test
    void createChatHandler_Success() throws UserException {
        SingleChatRequest singleChatRequest = new SingleChatRequest();
        singleChatRequest.setUserId(2);

        when(userService.findUserProfile(anyString())).thenReturn(user);
        when(chatService.createChat(any(User.class), anyInt())).thenReturn(chat);

        ResponseEntity<Chat> response = chatController.createChatHandler(singleChatRequest, "Bearer token");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(chat, response.getBody());
        verify(chatService).createChat(any(User.class), anyInt());
    }

    @Test
    void createGroupHandler_Success() throws UserException {
        GroupChatRequest groupChatRequest = new GroupChatRequest();
        groupChatRequest.setUserIds(Arrays.asList(2, 3));
        groupChatRequest.setChat_name("Group Chat");

        when(userService.findUserProfile(anyString())).thenReturn(user);
        when(chatService.createGroup(any(GroupChatRequest.class), any(User.class))).thenReturn(chat);

        ResponseEntity<Chat> response = chatController.createGroupHandler(groupChatRequest, "Bearer token");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(chat, response.getBody());
        verify(chatService).createGroup(any(GroupChatRequest.class), any(User.class));
    }

    @Test
    void findChatByIdHandler_Success() throws ChatException {
        when(chatService.findChatById(anyInt())).thenReturn(chat);

        ResponseEntity<Chat> response = chatController.findChatByIdHandler(1, "Bearer token");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(chat, response.getBody());
        verify(chatService).findChatById(anyInt());
    }

    @Test
    void findAllChatsByUserId_Success() throws UserException {
        List<Chat> chats = Arrays.asList(chat);
        when(userService.findUserProfile(anyString())).thenReturn(user);
        when(chatService.findAllChatsByUserId(anyInt())).thenReturn(chats);

        ResponseEntity<List<Chat>> response = chatController.findAllChatsByUserId("Bearer token");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(chats, response.getBody());
        verify(chatService).findAllChatsByUserId(anyInt());
    }

    @Test
    void addUserToGroupHandler_Success() throws UserException, ChatException {
        when(userService.findUserProfile(anyString())).thenReturn(user);
        when(chatService.addUserToGroup(anyInt(), anyInt(), any(User.class))).thenReturn(chat);

        ResponseEntity<Chat> response = chatController.addUserToGroupHandler(1, 2, "Bearer token");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(chat, response.getBody());
        verify(chatService).addUserToGroup(anyInt(), anyInt(), any(User.class));
    }

    @Test
    void removeUserFromGroupHandler_Success() throws UserException, ChatException {
        when(userService.findUserProfile(anyString())).thenReturn(user);
        when(chatService.removeFromGroup(anyInt(), anyInt(), any(User.class))).thenReturn(chat);

        ResponseEntity<Chat> response = chatController.removeUserFromGroupHandler(1, 2, "Bearer token");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(chat, response.getBody());
        verify(chatService).removeFromGroup(anyInt(), anyInt(), any(User.class));
    }

    @Test
    void deleteChatHandler_Success() throws UserException, ChatException {
        when(userService.findUserProfile(anyString())).thenReturn(user);

        ResponseEntity<ApiResponse> response = chatController.deleteChatHandler(1, "Bearer token");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(chatService).deleteChat(anyInt(), anyInt());
    }
}

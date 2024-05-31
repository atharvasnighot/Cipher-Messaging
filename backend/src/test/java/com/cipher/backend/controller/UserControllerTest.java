package com.cipher.backend.controller;

import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.User;
import com.cipher.backend.model.UserDto;
import com.cipher.backend.request.UpdateUserRequest;
import com.cipher.backend.response.ApiResponse;
import com.cipher.backend.service.UserDtoMapper;
import com.cipher.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private UserDtoMapper userDtoMapper;

    @InjectMocks
    private UserController userController;

    private User user;
    private UserDto userDto;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setId(1);
        user.setEmail("test@example.com");

        userDto = new UserDto();
        userDto.setId(1);
        userDto.setEmail("test@example.com");
    }

    @Test
    void getUserProfileHandler_Success() throws UserException {
        when(userService.findUserProfile(anyString())).thenReturn(user);

        ResponseEntity<User> response = userController.getUserProfileHandler("Bearer token");

        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        assertEquals(user, response.getBody());
        verify(userService).findUserProfile(anyString());
    }

    @Test
    void searchUserHandler_Success() {
        List<User> users = Arrays.asList(user);
        when(userService.searchUser(anyString())).thenReturn(users);

        ResponseEntity<List<User>> response = userController.searchUserHandler("query");

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(users, response.getBody());
        verify(userService).searchUser(anyString());
    }

    @Test
    void updateUserHandler_Success() throws UserException {
        UpdateUserRequest updateUserRequest = new UpdateUserRequest();
        updateUserRequest.setFull_name("Updated Name");

        when(userService.findUserProfile(anyString())).thenReturn(user);
        doNothing().when(userService).updateUser(anyInt(), any(UpdateUserRequest.class));

        ResponseEntity<ApiResponse> response = userController.updateUserHandler(updateUserRequest, "Bearer token");

        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        verify(userService).findUserProfile(anyString());
        verify(userService).updateUser(anyInt(), any(UpdateUserRequest.class));
    }

    @Test
    void searchUsersByName_Success() {
        List<User> users = Arrays.asList(user);
        HashSet<User> userHashSet = new HashSet<>(users);
        HashSet<UserDto> userDtos = new HashSet<>(Arrays.asList(userDto));

        when(userService.searchUser(anyString())).thenReturn(users);
        when(UserDtoMapper.toUserDtos(userHashSet)).thenReturn(userDtos);

        ResponseEntity<HashSet<UserDto>> response = userController.searchUsersByName("name");

        assertEquals(HttpStatus.ACCEPTED, response.getStatusCode());
        assertEquals(userDtos, response.getBody());
        verify(userService).searchUser(anyString());
    }
}

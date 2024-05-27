package com.cipher.backend.controller;

import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.User;
import com.cipher.backend.model.UserDto;
import com.cipher.backend.request.UpdateUserRequest;
import com.cipher.backend.response.ApiResponse;
import com.cipher.backend.service.UserDtoMapper;
import com.cipher.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String token) throws UserException {
        log.info("Fetching user profile for token: {}", token);

        User user = userService.findUserProfile(token);
        log.info("User profile retrieved for user ID: {}", user.getId());

        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{query}")
    public ResponseEntity<List<User>> searchUserHandler(@PathVariable String query) {
        log.info("Searching users with query: {}", query);

        List<User> users = userService.searchUser(query);
        log.info("Found {} users matching query: {}", users.size(), query);

        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateUserHandler(@RequestBody UpdateUserRequest request, @RequestHeader("Authorization") String token) throws UserException {
        log.info("Update user request received with token: {}", token);

        User user = userService.findUserProfile(token);
        log.info("User ID Update Request: {}", user.getId());

        userService.updateUser(user.getId(), request);
        ApiResponse response = new ApiResponse("User updated successfully", true);

        log.info("User ID: {} updated successfully", user.getId());

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @GetMapping("/search")
    public ResponseEntity<HashSet<UserDto>> searchUsersByName(@RequestParam("name") String name) {
        log.info("Searching users by name: {}", name);

        List<User> users = userService.searchUser(name);
        HashSet<User> userHashSet = new HashSet<>(users);
        HashSet<UserDto> userDtos = UserDtoMapper.toUserDtos(userHashSet);

        log.info("Found {} users with name: {}", userDtos.size(), name);

        return new ResponseEntity<>(userDtos, HttpStatus.ACCEPTED);
    }
}


package com.cipher.backend.controller;

import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.User;
import com.cipher.backend.model.UserDto;
import com.cipher.backend.request.UpdateUserRequest;
import com.cipher.backend.response.ApiResponse;
import com.cipher.backend.service.UserDtoMapper;
import com.cipher.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfileHandler(@RequestHeader("Authorization") String token) throws UserException {

        User user = userService.findUserProfile(token);
        return new ResponseEntity<User>(user, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{query}")
    public ResponseEntity<List<User>> searchUserHandler(@PathVariable String query){
        List<User> users = userService.searchUser(query);
        return new ResponseEntity<List<User>>(users, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<ApiResponse> updateUserHandler(@RequestBody UpdateUserRequest request, @RequestHeader("Authorization") String token) throws UserException {

        User user = userService.findUserProfile(token);
        System.out.println("User Id Update Request " + user.getId());
        userService.updateUser(user.getId(), request);
        ApiResponse response = new ApiResponse("User updates successfully", true);

        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @GetMapping("/search")
    public ResponseEntity<HashSet<UserDto>> searchUsersByName(@RequestParam("name") String name){
        List<User> users = userService.searchUser(name);
        HashSet<User> userHashSet = new HashSet<>(users);
        HashSet<UserDto> userDtos = UserDtoMapper.toUserDtos(userHashSet);

        return new ResponseEntity<>(userDtos, HttpStatus.ACCEPTED);
    }


}

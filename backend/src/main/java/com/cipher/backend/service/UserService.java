package com.cipher.backend.service;

import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.User;
import com.cipher.backend.request.UpdateUserRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    User findUserById(Integer id) throws UserException;

    public User findUserProfile(String jwt) throws UserException;

    public User updateUser (Integer userId, UpdateUserRequest req) throws UserException;

    public List<User> searchUser(String query);
}

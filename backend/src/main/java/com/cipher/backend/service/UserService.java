package com.cipher.backend.service;

import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.User;
import com.cipher.backend.request.UpdateUserRequest;

import java.util.List;

public interface UserService {

    public User findUserById(Integer id) throws UserException;

    public User findUserProfile(String jwt) throws UserException;

    public User updateUser (Integer userId, UpdateUserRequest req);

    public List<User> searchUser(String query);
}

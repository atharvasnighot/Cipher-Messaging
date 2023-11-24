package com.cipher.backend.service;

import com.cipher.backend.config.TokenProvider;
import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.User;
import com.cipher.backend.repository.UserRepository;
import com.cipher.backend.request.UpdateUserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;

import java.util.List;
import java.util.Optional;

public class UserServiceImplementation implements UserService {

    private UserRepository userRepository;

    public UserServiceImplementation(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Autowired
    private TokenProvider tokenProvider;

    @Override
    public User findUserById(Integer id) throws UserException{
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent())
            return optionalUser.get();

        throw new UserException("User Not Found with Id " + id);
    }

    @Override
    public User findUserProfile(String jwt) throws UserException {
        String email = tokenProvider.getEmailFromToken(jwt);

        if (email == null) {
            throw new BadCredentialsException("Invalid Token");
        }
        User user = userRepository.findByEmail(email);

        if (user == null){
            throw new UserException("User Not Found");
        }
        return user;
    }

    @Override
    public User updateUser(Integer userId, UpdateUserRequest req) {
        return null;
    }

    @Override
    public List<User> searchUser(String query) {
        return null;
    }
}

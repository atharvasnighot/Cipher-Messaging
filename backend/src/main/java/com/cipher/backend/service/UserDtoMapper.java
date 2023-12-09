package com.cipher.backend.service;

import com.cipher.backend.model.User;
import com.cipher.backend.model.UserDto;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

public class UserDtoMapper {

    public static UserDto toUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFull_name(user.getFullName());
        userDto.setEmail(user.getEmail());
        userDto.setProfile_picture(user.getProfilePicture());
        return userDto;
    }

    public static HashSet<UserDto> toUserDtos(HashSet<User> users) {
        return users.stream()
                .map(UserDtoMapper::toUserDto)
                .collect(Collectors.toCollection(HashSet::new));
    }

    public static List<UserDto> toUserDtos(List<User> users) {
        return users.stream()
                .map(UserDtoMapper::toUserDto)
                .collect(Collectors.toList());
    }
}

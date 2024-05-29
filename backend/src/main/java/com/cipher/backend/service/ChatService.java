package com.cipher.backend.service;

import com.cipher.backend.exception.ChatException;
import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.Chat;
import com.cipher.backend.model.User;
import com.cipher.backend.request.GroupChatRequest;

import java.util.List;

public interface ChatService {

    Chat createChat(User requestUser, Integer userId2) throws UserException;

    Chat findChatById(Integer chatId) throws ChatException;

    List<Chat> findAllChatsByUserId(Integer userId) throws UserException;

    Chat createGroup(GroupChatRequest request, User requestUser) throws UserException;

    Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException;

    Chat renameGroup(Integer chatId, String groupName, User requestUser) throws ChatException, UserException;

    Chat removeFromGroup(Integer chatId, Integer userId, User requestUser) throws UserException, ChatException;

    void deleteChat(Integer chatId, Integer userId) throws ChatException, UserException;

}

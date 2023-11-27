package com.cipher.backend.service;

import com.cipher.backend.exception.ChatException;
import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.Chat;

import java.util.List;

public interface ChatService {

    Chat createChat(Integer requestUser, Integer userId2) throws UserException;

    Chat findChatById(Integer chatId) throws ChatException;

    List<Chat> findAllChatByUserId(Integer userId) throws UserException;

    Chat createGroup(GroupChatRequest request, Integer requestUserId) throws UserException;

    Chat addUserToGroup(Integer userId, Integer chatId) throws UserException, ChatException;

    Chat renameGroup(Integer chatId, String groupName, Integer requestUserId) throws ChatException, UserException;

    Chat removeFromGroup(Integer chatId, Integer userId, Integer requestUser) throws UserException, ChatException;

    Chat deleteChat(Integer chatId, Integer userId) throws ChatException, UserException;

}

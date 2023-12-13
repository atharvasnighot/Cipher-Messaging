package com.cipher.backend.service;

import com.cipher.backend.exception.ChatException;
import com.cipher.backend.exception.MessageException;
import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.Message;
import com.cipher.backend.model.User;
import com.cipher.backend.request.SendMessageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MessageService {

    Message sendMessage(SendMessageRequest request) throws UserException, ChatException;

    List<Message> getChatMessages(Integer chatId, User requestUser) throws ChatException, UserException;

    Message findMessageById(Integer messageId) throws MessageException;

    void deleteMessage(Integer messageId, User requestUser) throws MessageException, UserException;
}

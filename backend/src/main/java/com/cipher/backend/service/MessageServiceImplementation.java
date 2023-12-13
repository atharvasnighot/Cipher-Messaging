package com.cipher.backend.service;

import com.cipher.backend.exception.ChatException;
import com.cipher.backend.exception.MessageException;
import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.Chat;
import com.cipher.backend.model.Message;
import com.cipher.backend.model.User;
import com.cipher.backend.repository.MessageRepository;
import com.cipher.backend.request.SendMessageRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageServiceImplementation implements MessageService{

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ChatService chatService;

    @Override
    public Message sendMessage(SendMessageRequest request) throws UserException, ChatException {

        User user = userService.findUserById(request.getUserId());
        Chat chat = chatService.findChatById(request.getChatId());

        Message message = new Message();
        message.setChat(chat);
        message.setUser(user);
        message.setContent(request.getContent());
        message.setTimeStamp(LocalDateTime.now());

        messageRepository.save(message);
        return message;
    }

    @Override
    public List<Message> getChatMessages(Integer chatId, User requestUser) throws ChatException, UserException {

        Chat chat = chatService.findChatById(chatId);
        if (!chat.getUsers().contains(requestUser)){
            throw new UserException("Cannot Access This Chat");
        }
        List<Message> messages = messageRepository.findByChatId(chatId);

        return messages;
    }

    @Override
    public Message findMessageById(Integer messageId) throws MessageException {

        Optional<Message> optional = messageRepository.findById(messageId);

        if (optional.isPresent()){
            return optional.get();
        }

        throw new MessageException("Message Not Found");
    }

    @Override
    public void deleteMessage(Integer messageId, User requestUser) throws MessageException, UserException {

        Message message = findMessageById(messageId);
        if (message.getUser().getId().equals(requestUser.getId())){
            messageRepository.deleteById(messageId);
        }
        throw new UserException("You cannot Delete this Message");
    }
}

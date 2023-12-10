package com.cipher.backend.service;
import com.cipher.backend.exception.ChatException;
import com.cipher.backend.exception.UserException;
import com.cipher.backend.model.Chat;
import com.cipher.backend.model.User;
import com.cipher.backend.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatServiceImplementation implements ChatService{

    @Autowired
    private ChatRepository chatRepository;

    @Autowired
    private UserService userService;

    @Override
    public Chat createChat(User requestUser, Integer userId2) throws UserException {
        User user = userService.findUserById(userId2);
        Chat isChatExist = chatRepository.findSingleChatByUserId(user, requestUser);

        if (isChatExist != null)
            return isChatExist;

        Chat chat = new Chat();
        chat.setCreatedBy(requestUser);
        chat.getUsers().add(user);
        chat.getUsers().add(requestUser);
        chat.setGroup(false);

        return chat;
    }

    @Override
    public Chat findChatById(Integer chatId) throws ChatException {
        Optional<Chat> chat = chatRepository.findById(chatId);

        if (chat.isPresent())
            return chat.get();

        System.out.println("CHAT NOT FOUND");
        throw new ChatException("Chat not found with id " + chatId);
    }

    @Override
    public List<Chat> findAllChatsByUserId(Integer userId) throws UserException {

        User user = userService.findUserById(userId);
        List<Chat> chats = chatRepository.findChatByUserId(user.getId());
        return chats;
    }

    @Override
    public Chat createGroup(GroupChatRequest request, User requestUser) throws UserException {

        Chat group = new Chat();
        group.setGroup(true);
        group.setChat_image(request.getChat_image());
        group.setChat_name(request.getChat_name());
        group.setCreatedBy(requestUser);
        group.getAdmins().add(requestUser);

        for (Integer userId: request.getUserIds()) {
            User user = userService.findUserById(userId);
            group.getUsers().add(user);
        }
        return group;
    }

    @Override
    public Chat addUserToGroup(Integer userId, Integer chatId, User reqUser) throws UserException, ChatException {

        Optional<Chat> optionalChat = chatRepository.findById(chatId);
        User user = userService.findUserById(userId);

        if (optionalChat.isPresent()){
            Chat chat = optionalChat.get();
            if (chat.getAdmins().contains(reqUser)){
                chat.getUsers().add(user);
                return chatRepository.save(chat);
            }
        }

        throw new UserException("You are not an Admin");
    }

    @Override
    public Chat renameGroup(Integer chatId, String groupName, User requestUser) throws ChatException, UserException {

        Optional<Chat> optionalChat = chatRepository.findById(chatId);
        if (optionalChat.isPresent()){
            Chat chat = optionalChat.get();
            if (chat.getUsers().contains(requestUser)){
                chat.setChat_name(groupName);
                return chatRepository.save(chat);
            }
            throw new UserException("You are not a member of this group");
        }
        throw new ChatException("Chat not found");
    }

    @Override
    public Chat removeFromGroup(Integer chatId, Integer userId, User requestUser) throws UserException, ChatException {
        Optional<Chat> optionalChat = chatRepository.findById(chatId);
        User user = userService.findUserById(userId);

        if (optionalChat.isPresent()){
            Chat chat = optionalChat.get();
            if (chat.getAdmins().contains(requestUser)){
                chat.getUsers().remove(user);
                return chatRepository.save(chat);
            }
            else if (chat.getUsers().contains(requestUser)){
                if (user.getId().equals(requestUser.getId())){
                    chat.getUsers().remove(user);
                    return chatRepository.save(chat);
                }
            }
        }
        throw new UserException("You Can Not Remove Another User");
    }

    @Override
    public void deleteChat(Integer chatId, Integer userId) throws ChatException, UserException {

        Optional<Chat> optionalChat = chatRepository.findById(chatId);
        if (optionalChat.isPresent()){
            Chat chat = optionalChat.get();
            chatRepository.deleteById(chat.getId());
        }
    }
}

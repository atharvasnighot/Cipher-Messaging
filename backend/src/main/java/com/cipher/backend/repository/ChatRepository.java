package com.cipher.backend.repository;

import com.cipher.backend.model.Chat;
import com.cipher.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

    @Query("SELECT c FROM Chat c " +
            "WHERE c.isGroup=false AND" +
            ":user Member of c.users AND " +
            ":reqUser Member of c.users")
    Chat findSingleChatByUserId(@Param("user") User user, @Param("reqUser") User reqUser);


    @Query("SELECT c FROM Chat c JOIN c.users u " +
            "WHERE u.id =: userId")
    List<Chat> findChatByUserId(@Param("userId") Integer userId);
}

package com.cipher.backend.repository;

import com.cipher.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Query("SELECT m FROM Message m " +
            "JOIN m.chat c WHERE c.id =:chatId")
    List<Message> findByChatId(@Param("chatId") Integer chatId);


}

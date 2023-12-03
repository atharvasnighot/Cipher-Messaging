package com.cipher.backend.config;


import com.cipher.backend.model.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;

public class RealtimeChatController {

    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    @SendTo("/group/public")
    public Message receiveMessage(@Payload Message message){

        simpMessagingTemplate.convertAndSend("/group"+message.getChat().getId().toString(), message);
        return message;
    }
}

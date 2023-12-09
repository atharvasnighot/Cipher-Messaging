package com.cipher.backend.service;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupChatRequest {

    private List<Integer> userIds;
    private String chat_name;
    private String chat_image;

}

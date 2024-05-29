package com.cipher.backend.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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

    @NotEmpty(message = "User IDs list cannot be empty")
    private List<Integer> userIds;

    @NotNull(message = "Chat name cannot be null")
    private String chat_name;

    private String chat_image;
}

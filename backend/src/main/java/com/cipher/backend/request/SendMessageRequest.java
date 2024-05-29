package com.cipher.backend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageRequest {

    @NotNull(message = "User ID cannot be null")
    private Integer userId;

    @NotNull(message = "Chat ID cannot be null")
    private Integer chatId;

    @NotBlank(message = "Content cannot be blank")
    private String content;
}


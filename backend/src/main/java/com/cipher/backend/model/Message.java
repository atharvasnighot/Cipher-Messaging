package com.cipher.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotBlank(message = "Content cannot be blank")
    private String content;

    @NotNull(message = "Timestamp must be provided")
    private LocalDateTime timeStamp;

    @NotNull(message = "User must be provided")
    @ManyToOne
    private User user;

    @NotNull(message = "Chat must be provided")
    @ManyToOne
    private Chat chat;
}


package com.cipher.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @NotEmpty(message = "Chat name cannot be empty")
    private String chat_name;

    // Assuming chat_image can be empty
    private String chat_image;

    @NotNull(message = "Group indicator must be provided")
    @Column(name = "is_group")
    private Boolean isGroup;

    @NotNull(message = "Admins set must be provided")
    @ManyToMany
    private Set<User> admins = new HashSet<>();

    @NotNull(message = "Creator user must be provided")
    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @NotNull(message = "Users set must be provided")
    @ManyToMany
    private Set<User> users = new HashSet<>();

    // Assuming messages can be empty
    @OneToMany
    private List<Message> messages = new ArrayList<>();
}


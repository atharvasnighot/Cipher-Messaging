package com.cipher.backend.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String chatName;
    private String chatImage;
    private boolean isGroup;

    @ManyToOne
    private User createdBy;

    @ManyToMany
    private Set<User> users = new HashSet<>();

    @OneToMany //Many messages for one chat
    private List<Message> messages = new ArrayList<>();


}

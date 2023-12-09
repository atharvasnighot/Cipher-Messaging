package com.cipher.backend.model;

import jakarta.persistence.*;
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

    private String chat_name;
    private String chat_image;

    @Column(name = "is_group")
    private boolean isGroup;

    @ManyToMany
    private Set<User> admins = new HashSet<>();


    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;

    @ManyToMany
    private Set<User> users = new HashSet<>();

    @OneToMany //Many messages for one chat
    private List<Message> messages = new ArrayList<>();


}

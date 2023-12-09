package com.cipher.backend.repository;

import com.cipher.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.full_name LIKE %:query% OR u.email LIKE %:query%")
    List<User> searchUser(@Param("query") String query);
}

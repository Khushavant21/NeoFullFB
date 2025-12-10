package com.example.neobank.dao;

import com.example.neobank.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserDao
{
    User save(User user);
    Optional<User> findByEmail(String email);
    Optional<User> findByCustomerId(String customerId);
    void delete(User user);
    List<User> findAll();
}
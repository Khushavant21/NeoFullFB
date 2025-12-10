package com.example.neobank.dao.impl;

import com.example.neobank.dao.UserDao;
import com.example.neobank.entity.User;
import com.example.neobank.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao
{
    @Autowired
    private UserRepository repo;

    @Override
    public User save(User user)
    {
        return repo.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email)
    {
        return repo.findByEmail(email);
    }

    @Override
    public Optional<User> findByCustomerId(String customerId)
    {
        return repo.findByCustomerId(customerId);
    }

    @Override
    public void delete(User user)
    {
        repo.delete(user);
    }
    
    @Override
    public List<User> findAll()
    {
        return repo.findAll();
    }
}
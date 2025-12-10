package com.example.neobank.dao.impl;

import com.example.neobank.dao.ResetTokenDao;
import com.example.neobank.entity.ResetToken;
import com.example.neobank.repository.ResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public class ResetTokenDaoImpl implements ResetTokenDao
{

    @Autowired
    private ResetTokenRepository repo;

    @Override
    public ResetToken save(ResetToken token)
    {
        return repo.save(token);
    }

    @Override
    public Optional<ResetToken> findByToken(String token)
    {
        return repo.findByToken(token);
    }

    @Override
    public void deleteByEmail(String email)
    {
        repo.deleteByEmail(email);
    }

    @Override
    public void delete(ResetToken token)
    {
        repo.delete(token);
    }
}
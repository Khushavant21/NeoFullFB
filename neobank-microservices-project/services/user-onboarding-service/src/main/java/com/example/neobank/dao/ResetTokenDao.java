package com.example.neobank.dao;

import com.example.neobank.entity.ResetToken;
import java.util.Optional;

public interface ResetTokenDao
{
    ResetToken save(ResetToken token);
    Optional<ResetToken> findByToken(String token);
    void deleteByEmail(String email);
    void delete(ResetToken token);
}
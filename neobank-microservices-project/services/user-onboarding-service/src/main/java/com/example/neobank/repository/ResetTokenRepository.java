package com.example.neobank.repository;

import com.example.neobank.entity.ResetToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ResetTokenRepository extends MongoRepository<ResetToken, String>
{
    Optional<ResetToken> findByToken(String token);
    void deleteByEmail(String email);
}
package com.example.neobank.repository;

import com.example.neobank.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String>
{
    Optional<User> findByEmail(String email);
    Optional<User> findByCustomerId(String customerId);
    long countByKycStatus(String status);
}
package com.example.neobank.repository;

import com.example.neobank.entity.OtpEntry;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface OtpRepository extends MongoRepository<OtpEntry, String>
{
    Optional<OtpEntry> findByPurposeAndRef(String purpose, String ref);
    void deleteByPurposeAndRef(String purpose, String ref);
}
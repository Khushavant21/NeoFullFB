package com.example.neobank.repository;

import com.example.neobank.entity.ClientProfileInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ClientProfileInfoRepository extends MongoRepository<ClientProfileInfo, String> {
    Optional<ClientProfileInfo> findByEmail(String email);
}

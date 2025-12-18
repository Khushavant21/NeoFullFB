package com.example.neobank.repository;

import com.example.neobank.entity.AdminUserInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface AdminUserInfoRepository extends MongoRepository<AdminUserInfo, String> {
    Optional<AdminUserInfo> findByEmail(String email);
}

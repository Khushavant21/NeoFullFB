package com.example.neobank.repository;

import com.example.neobank.entity.AccessLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface AccessLogRepository extends MongoRepository<AccessLog, String> {
    List<AccessLog> findByEmailOrderByCreatedAtDesc(String email);
}

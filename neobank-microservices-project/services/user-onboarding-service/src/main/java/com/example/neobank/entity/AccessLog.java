package com.example.neobank.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Data
@Document(collection = "access_logs")
public class AccessLog {
    @Id
    private String id;
    private String email;
    private String date;
    private String time;
    private String device;
    private String ip;
    private String location;
    private String status;
    private boolean isIPBased;
    private Instant createdAt = Instant.now();
}

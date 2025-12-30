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
    private Instant timestamp; // UTC login time
    private String ip;
    private String deviceType;
    private String os;
    private String browser;
    private String city;
    private String region;
    private String country;
    private String timezone;
    private String isp;
    private Double latitude; // Consent-based exact
    private Double longitude; // Consent-based exact
    private boolean locationConsent;
    private String status;
    private Instant createdAt = Instant.now();
}

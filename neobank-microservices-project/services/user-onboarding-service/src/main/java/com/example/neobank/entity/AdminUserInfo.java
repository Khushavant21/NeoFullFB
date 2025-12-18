package com.example.neobank.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;
import java.util.List;

@Data
@Document(collection = "admin_user_info")
public class AdminUserInfo {
    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String fullName;
    private String fatherName;
    private String mobile;
    private String address;
    private String dob;
    private String gender;

    // Critical Identity
    private String aadhaar;
    private String pan;
    private String accountNumber;
    
    // Status
    private String status; // Active, Suspended, Pending KYC
    private boolean frozen;
    
    // Document URLs for Admin View
    private String photoUrl;
    private String aadhaarFrontUrl;
    private String aadhaarBackUrl;
    private String panCardUrl;
    private String signatureUrl;

    private Instant lastSyncedAt = Instant.now();
}

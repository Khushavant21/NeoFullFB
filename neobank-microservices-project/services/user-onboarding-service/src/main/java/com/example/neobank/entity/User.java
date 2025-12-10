package com.example.neobank.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Data
@Document(collection = "users")
public class User
{
    @Id
    private String id;
    private String customerId;
    private String fullName;
   private String role;

    @Indexed(unique = true)
    private String email;
    private String mobile;
    private String dob;
    private String gender;

    private String aadhaar;
    private boolean aadhaarVerified;

    private String pan;
    private boolean panVerified = false;
    private boolean panApprovalPending = false;
    private boolean panVerificationPending = false;
    private boolean panApprovedByAdmin = false;
    private boolean panRejectedByAdmin = false;

    private String aadhaarPhotoUrl;   // KYC photo
    private String signatureUrl;      // Signature image
    private String profileImageUrl;   // Profile picture
    private String kycStatus = "PENDING";

    private String passwordHash;
    private Instant createdAt = Instant.now();

    private String videoKycStatus= "PENDING";
    private String accountNumber;
    private String ifscCode;

    private String kycRejectedReason;
    private Instant kycApprovedAt;


}
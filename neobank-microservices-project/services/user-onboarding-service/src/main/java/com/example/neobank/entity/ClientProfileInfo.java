package com.example.neobank.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "client_profile_info")
public class ClientProfileInfo {
    @Id
    private String id;
    
    @Indexed(unique = true)
    private String email;
    
    private String fullName;
    private String fatherName;
    private String aadhaar;
    private String mobile;
    private String dob;
    private String gender;
    private String address;
    private String profileImageUrl;
}

package com.example.neobank.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Data
@Document(collection = "otp_entries")
public class OtpEntry
{
    @Id
    private String id;
    private String purpose;
    private String ref;
    private String code;
    private Instant expiry;
}
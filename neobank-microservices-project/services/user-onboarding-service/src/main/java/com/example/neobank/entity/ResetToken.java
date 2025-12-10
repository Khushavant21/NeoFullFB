package com.example.neobank.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Data
@Document(collection = "reset_tokens")
public class ResetToken
{
    @Id
    private String id;
    private String email;
    private String token;
    private Instant expiry;
}

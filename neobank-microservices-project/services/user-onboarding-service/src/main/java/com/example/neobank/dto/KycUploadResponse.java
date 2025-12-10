package com.example.neobank.dto;

import lombok.Data;

@Data
public class KycUploadResponse
{
    private String message;
    private String photoUrl;
    private String signatureUrl;

}

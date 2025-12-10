package com.example.neobank.dto;

import lombok.Data;

@Data
public class OtpRequest
{
    private String ref;
    private String code;
}
package com.example.neobank.dto;

import lombok.Data;

@Data
public class LoginRequest
{
    private String customerIdOrEmail;
    private String password;
}
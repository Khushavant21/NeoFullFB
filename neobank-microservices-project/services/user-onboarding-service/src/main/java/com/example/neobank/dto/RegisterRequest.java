package com.example.neobank.dto;

import lombok.Data;

@Data
public class RegisterRequest
{
    private String fullName;
    private String email;
    private String mobile;
    private String dob;
    private String gender;

}
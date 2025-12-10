package com.example.neobank.services;

public interface OtpService
{
    String generateOtpFor(String purpose, String ref);
    boolean verifyOtp(String purpose, String ref, String code);
}
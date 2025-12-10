package com.example.neobank.services;

public interface PasswordService
{
    String createResetTokenFor(String email);
    boolean resetPassword(String token, String newPassword);
}
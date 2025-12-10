package com.example.neobank.services;

public interface EmailService
{
    void sendSimpleEmail(String to, String subject, String htmlBody);
}
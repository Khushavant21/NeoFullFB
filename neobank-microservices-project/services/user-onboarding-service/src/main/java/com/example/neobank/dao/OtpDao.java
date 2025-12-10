package com.example.neobank.dao;

import com.example.neobank.entity.OtpEntry;
import java.util.Optional;

public interface OtpDao
{
    OtpEntry save(OtpEntry otp);
    Optional<OtpEntry> findByPurposeAndRef(String purpose, String ref);
    void deleteByPurposeAndRef(String purpose, String ref);
    void delete(OtpEntry otp);
}
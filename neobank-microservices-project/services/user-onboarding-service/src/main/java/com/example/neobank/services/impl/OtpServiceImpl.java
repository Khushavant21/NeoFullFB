package com.example.neobank.services.impl;

import com.example.neobank.dao.OtpDao;
import com.example.neobank.entity.OtpEntry;
import com.example.neobank.services.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Random;

@Service
public class OtpServiceImpl implements OtpService
{
    @Autowired
    private OtpDao otpDao;

    private final Random rnd = new Random();

    @Value("${app.otp.expiryMinutes:5}")
    private long expiryMinutes;

    @Override
    public String generateOtpFor(String purpose, String ref)
    {
        String code = String.format("%06d", rnd.nextInt(1_000_000));
        OtpEntry entry = new OtpEntry();
        entry.setPurpose(purpose);
        entry.setRef(ref);
        entry.setCode(code);
        entry.setExpiry(Instant.now().plus(expiryMinutes, ChronoUnit.MINUTES));

        otpDao.deleteByPurposeAndRef(purpose, ref);
        otpDao.save(entry);
        return code;
    }

    @Override
    public boolean verifyOtp(String purpose, String ref, String code)
    {
        return otpDao.findByPurposeAndRef(purpose, ref)
                .map(e -> {
                    boolean valid = e.getCode().equals(code) && e.getExpiry().isAfter(Instant.now());
                    if (valid) otpDao.delete(e);
                    return valid;
                })
                .orElse(false);
    }
}
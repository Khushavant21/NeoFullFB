package com.example.neobank.services.impl;

import com.example.neobank.dao.ResetTokenDao;
import com.example.neobank.dao.UserDao;
import com.example.neobank.entity.ResetToken;
import com.example.neobank.entity.User;
import com.example.neobank.services.EmailService;
import com.example.neobank.services.PasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordServiceImpl implements PasswordService
{
    @Autowired
    private ResetTokenDao resetTokenDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private EmailService emailService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Value("${app.reset.expiryMinutes:30}")
    private long resetExpiryMinutes;

    @Override
    public String createResetTokenFor(String email)
    {
        resetTokenDao.deleteByEmail(email);
        ResetToken t = new ResetToken();
        t.setEmail(email);
        t.setToken(UUID.randomUUID().toString());
        t.setExpiry(Instant.now().plus(resetExpiryMinutes, ChronoUnit.MINUTES));
        resetTokenDao.save(t);
        String link = "https://yourfrontend.example/reset-password?token=" + t.getToken();
        emailService.sendSimpleEmail(email, "Neobank - Reset your password", "Reset your password using this link: " + link);
        return t.getToken();
    }

    @Override
    public boolean resetPassword(String token, String newPassword)
    {
        Optional<ResetToken> maybe = resetTokenDao.findByToken(token);
        if (maybe.isEmpty()) return false;
        ResetToken t = maybe.get();
        if (t.getExpiry().isBefore(Instant.now())) return false;
        Optional<User> uOpt = userDao.findByEmail(t.getEmail());
        if (uOpt.isEmpty()) return false;
        User u = uOpt.get();
        u.setPasswordHash(passwordEncoder.encode(newPassword));
        userDao.save(u);
        resetTokenDao.delete(t);
        return true;
    }
}
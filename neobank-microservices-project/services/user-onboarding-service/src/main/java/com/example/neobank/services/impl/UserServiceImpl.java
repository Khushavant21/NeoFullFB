package com.example.neobank.services.impl;

import com.example.neobank.dao.UserDao;
import com.example.neobank.dao.ResetTokenDao;
import com.example.neobank.entity.User;
import com.example.neobank.services.EmailService;
import com.example.neobank.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserServiceImpl implements UserService
{
    @Autowired
    private UserDao userDao;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ResetTokenDao resetTokenDao;

    private final Random rnd = new Random();

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;



    @Value("${app.reset.expiryMinutes:30}")
    private long resetExpiryMinutes;

    @Override
    public User createUserDraft(User user)
    {
        // ✅ Check if email already exists
        Optional<User> existingUser = userDao.findByEmail(user.getEmail());
        if (existingUser.isPresent())
        {
            throw new RuntimeException("User with this email already exists");
        }
        return userDao.save(user);
    }

    @Override
    public User finalizeRegistration(User user)
    {
        String customerId = generateCustomerId();
        String rawPassword = generatePassword();
        user.setCustomerId(customerId);
        user.setPasswordHash(passwordEncoder.encode(rawPassword));
        User saved = userDao.save(user);

        String body = String.format("""
                <html>
                <body style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                        <h2 style="color: #2b6cb0; text-align: center;">Welcome to <span style="color: #1a73e8;">Neobank</span> 🎉</h2>
                        <p>Hello <b>%s</b>,</p>
                        <p>We’re excited to have you onboard! Your Neobank account has been successfully created.</p>

                        <div style="background: #f1f1f1; padding: 15px; border-radius: 8px; margin: 20px 0;">
                            <p><b>Customer ID:</b> %s</p>
                            <p><b>Temporary Password:</b> %s</p>
                        </div>

                        <p style="color: #d9534f;"><b>⚠️ Please change your password immediately after your first login for security reasons.</b></p>

                        <p>Thank you for choosing Neobank. We’re here to make your banking experience simple and secure!</p>

                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
                        <p style="font-size: 12px; color: gray; text-align: center;">
                            © 2025 Neobank. All rights reserved.
                        </p>
                    </div>
                </body>
                </html>
                """, user.getFullName(), customerId, rawPassword);

        emailService.sendSimpleEmail(user.getEmail(), "🎉 Welcome to Neobank – Your Login Credentials", body);
        return saved;
    }

    public String generateCustomerId()
    {
        int num = 10000 + rnd.nextInt(90000);
        return "CUST" + num;
    }

    public String generatePassword()
    {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%!&";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10; i++) sb.append(chars.charAt(rnd.nextInt(chars.length())));
        return sb.toString();
    }

    @Override
    public Optional<User> findByEmail(String email)
    {
        return userDao.findByEmail(email);
    }

    @Override
    public Optional<User> findByCustomerId(String customerId)
    {
        return userDao.findByCustomerId(customerId);
    }

    @Override
    public boolean checkPassword(User user, String rawPassword)
    {
        return passwordEncoder.matches(rawPassword, user.getPasswordHash());
    }
    
    @Override
    public User save(User user)
    {
        return userDao.save(user);
    }
    
    @Override
    public List<User> findPendingPanUsers()
    {
        return userDao.findAll().stream()
               .filter(User::isPanVerificationPending)
               .toList();
    }
    
    @Override
    public String encodePassword(String raw)
    {
        return passwordEncoder.encode(raw);
    }



    public String generateAccountNumber(){
        long part = 1_000_000_000L + (long)(rnd.nextDouble() * 8_999_999_999L);
        return String.valueOf(part);

    }

    @Override
    public void approveKyc(String customerId) {
        Optional<User> opt = userDao.findByCustomerId(customerId);
        if (opt.isEmpty()) {
            throw new RuntimeException("User not found with customerId: " + customerId);
        }
        User user = opt.get();

        user.setVideoKycStatus("APPROVED");
        user.setKycStatus("APPROVED");

        String accountNo = generateAccountNumber();
        String ifsc = "NEOB0000123";
        user.setAccountNumber(accountNo);
        user.setIfscCode(ifsc);
        user.setKycApprovedAt(Instant.now());
        user.setKycRejectedReason(null);

        userDao.save(user);

        String html = """
            <div style='font-family: Arial, sans-serif; padding:20px; background:#f4f6f8'>
              <div style='max-width:600px; margin:auto; background:white; padding:20px; border-radius:8px;'>
                <h2 style='color:#1a73e8;'>✅ Video KYC Approved</h2>
                <p>Dear <b>%s</b>,</p>
                <p>Your Video KYC has been approved. Your bank account has been created.</p>
                <div style='background:#f1f8ff; padding:12px; border-radius:6px; margin-top:10px;'>
                  <p style='margin:6px 0;'><strong>Account Number:</strong> %s</p>
                  <p style='margin:6px 0;'><strong>IFSC Code:</strong> %s</p>
                </div>
                <p style='margin-top:12px;'>Please log in and change your password if you haven't already.</p>
                <p style='margin-top:18px; color:#777;'>Best Regards,<br/>Neobank Team</p>
              </div>
            </div>
            """.formatted(user.getFullName(), accountNo, ifsc);
        emailService.sendSimpleEmail(user.getEmail(),"Neobank - KYC Approved and Account Created",html);
    }


    @Override
    public void rejectKyc(String customerId, String reason) {
        Optional<User> opt = userDao.findByCustomerId(customerId);
        if (opt.isEmpty()) {
            throw new RuntimeException("User not found with customerId: " + customerId);
        }
        User user = opt.get();
        user.setVideoKycStatus("REJECTED");
        user.setKycStatus("REJECTED");
        user.setKycRejectedReason(reason);
        user.setKycApprovedAt(null);

        user.setAccountNumber(null);
        user.setIfscCode(null);

        userDao.save(user);

        String html = """
            <div style='font-family: Arial, sans-serif; padding:20px; background:#fff7f7'>
              <div style='max-width:600px; margin:auto; background:white; padding:20px; border-radius:8px;'>
                <h2 style='color:#d9534f;'>❌ Video KYC Rejected</h2>
                <p>Dear <b>%s</b>,</p>
                <p>We are sorry to inform you that your Video KYC was not approved for the following reason:</p>
                <div style='background:#fff4f4; padding:12px; border-radius:6px; margin-top:10px;'>
                  <p style='margin:6px 0;'><strong>Reason:</strong> %s</p>
                </div>
                <p style='margin-top:12px;'>Please correct the issue and resubmit the Video KYC.</p>
                <p style='margin-top:18px; color:#777;'>Best Regards,<br/>Neobank Team</p>
              </div>
            </div>
            """.formatted(user.getFullName(), reason);

        emailService.sendSimpleEmail(user.getEmail(), "Neobank – KYC Rejected", html);
    }



}

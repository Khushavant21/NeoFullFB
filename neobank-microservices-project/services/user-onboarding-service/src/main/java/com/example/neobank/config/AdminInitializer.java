package com.example.neobank.config;

import com.example.neobank.entity.User;
import com.example.neobank.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Component
public class AdminInitializer implements CommandLineRunner
{
    @Autowired
    private UserDao userDao;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public void run(String... args)
    {
        String adminEmail = "admin@neobank.com";
        userDao.findByEmail(adminEmail).ifPresentOrElse(
            u -> {}, // already exists
            () -> {
                User admin = new User();
                admin.setFullName("System Admin");
                admin.setEmail(adminEmail);
                admin.setPasswordHash(encoder.encode("Admin@123"));
                admin.setRole("ADMIN");
                userDao.save(admin);
                System.out.println("✅ Default ADMIN created");
            }
        );
    }
}
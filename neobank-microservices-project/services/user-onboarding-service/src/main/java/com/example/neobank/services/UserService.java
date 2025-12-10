package com.example.neobank.services;

import com.example.neobank.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService
{
    User createUserDraft(User user);
    User finalizeRegistration(User user);
    Optional<User> findByEmail(String email);
    Optional<User> findByCustomerId(String customerId);
    boolean checkPassword(User user, String rawPassword);
    User save(User user);
	String generateCustomerId();
	String generatePassword();
	String encodePassword(String rawPassword);
	List<User> findPendingPanUsers();
    void approveKyc(String customerId);
    void rejectKyc(String customerId,String reason);
}
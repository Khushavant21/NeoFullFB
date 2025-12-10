package com.example.neobank.controller;

import com.example.neobank.entity.User;
import com.example.neobank.services.EmailService;
import com.example.neobank.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController
{
    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    // ✅ Get all pending PAN approvals
    @GetMapping("/pending-pan")
    public List<User> pending()
    {
        return userService.findPendingPanUsers();
    }

    // ✅ Approve PAN
    @PostMapping("/approve/{email}")
    public ResponseEntity<?> approve(@PathVariable String email)
    {
        User user = userService.findByEmail(email).orElseThrow();

        // generate credentials
        String customerId = userService.generateCustomerId();
        String rawPassword = userService.generatePassword();

        user.setCustomerId(customerId);
        user.setPasswordHash(userService.encodePassword(rawPassword));
        user.setPanApprovedByAdmin(true);
        user.setPanApprovalPending(false);

        userService.save(user);

        // --- Premium HTML Email Template ---
        String htmlMessage =
                "<div style='font-family: Arial, sans-serif; padding: 20px; background:#eef2f7;'>"
                        + "<div style='max-width: 550px; margin: auto; background:#ffffff; padding:25px; "
                        + "border-radius:12px; border-top:6px solid #1a73e8; box-shadow:0 4px 12px rgba(0,0,0,0.08);'>"

                        + "<h2 style='color:#1a73e8; text-align:center; margin-top:0;'>🎉 PAN Verification Approved</h2>"

                        + "<p style='font-size:15px; color:#333;'>Dear <b>" + user.getFullName() + "</b>,</p>"

                        + "<p style='font-size:15px; color:#444; line-height:1.6;'>"
                        + "We are thrilled to inform you that your <b>PAN verification has been successfully completed</b>. "
                        + "Your Neobank customer account is now active. Please find your login credentials below:"
                        + "</p>"

                        + "<div style='background:#f4f9ff; padding:18px; border-left:4px solid #900603; "
                        + "margin:20px 0; border-radius:8px;'>"
                        + "<p style='font-size:15px; margin:6px 0;'>👤 <b>Customer ID:</b> " + customerId + "</p>"
                        + "<p style='font-size:15px; margin:6px 0;'>🔐 <b>Password:</b> " + rawPassword + "</p>"
                        + "</div>"

                        + "<p style='font-size:15px; color:#555;'>"
                        + "Use these credentials to log in to the Neobank portal and complete your onboarding journey."
                        + "</p>"

                        + "<p style='font-size:14px; color:#777; margin-top:25px; line-height:1.5;'>"
                        + "If you have any questions or need assistance, our support team is available to help you anytime."
                        + "</p>"

                        + "<p style='font-size:16px; margin-top:30px; font-weight:bold; color:#900603;'>"
                        + "Best Regards,<br>Neobank Team"
                        + "</p>"

                        + "</div>"
                        + "</div>";

        emailService.sendSimpleEmail(
                user.getEmail(),
                "Neobank – PAN Approval Confirmation",
                htmlMessage
        );

        return ResponseEntity.ok(Map.of("message", "Approved"));
    }

    // ✅ Reject PAN
    @PostMapping("/reject/{email}")
    public ResponseEntity<?> reject(@PathVariable String email)
    {
        User user = userService.findByEmail(email).orElseThrow();

        user.setPanRejectedByAdmin(true);
        user.setPanApprovalPending(false);

        userService.save(user);

        // -------- Beautiful HTML Email Template for Rejection --------
        String htmlMessage =
                "<div style='font-family: Arial, sans-serif; padding: 20px; background:#f8f3f3;'>"
                        + "<div style='max-width: 550px; margin: auto; background:#ffffff; padding:25px; border-radius:10px; "
                        + "border-left:6px solid #d9534f; box-shadow:0 4px 10px rgba(0,0,0,0.08);'>"

                        + "<h2 style='color:#d9534f; text-align:center;'>⚠️ PAN Verification Rejected</h2>"

                        + "<p style='font-size:15px; color:#333;'>Dear <b>" + user.getFullName() + "</b>,</p>"

                        + "<p style='font-size:15px; color:#444;'>"
                        + "We regret to inform you that your <b>PAN verification has been rejected</b> during the review process."
                        + "</p>"

                        + "<div style='background:#fff4f4; padding:15px; border-left:4px solid #d9534f; margin:15px 0; border-radius:6px;'>"
                        + "<p style='font-size:15px; margin:5px 0;'>🚫 <b>Reason:</b> The provided PAN details did not meet the verification criteria.</p>"
                        + "</div>"

                        + "<p style='font-size:15px; color:#555;'>"
                        + "We request you to review your documents and resubmit them. If you need any support or clarity, feel free to connect with our support team."
                        + "</p>"

                        + "<p style='font-size:15px; color:#777; margin-top:25px;'>"
                        + "Our team is always here to help you complete your onboarding smoothly."
                        + "</p>"

                        + "<p style='font-size:16px; margin-top:30px; font-weight:bold; color:#d9534f;'>"
                        + "Best Regards,<br>Neobank Team"
                        + "</p>"

                        + "</div>"
                        + "</div>";

        emailService.sendSimpleEmail(
                user.getEmail(),
                "Neobank – PAN Verification Rejected",
                htmlMessage
        );

        return ResponseEntity.ok(Map.of("message", "Rejected"));
    }
}
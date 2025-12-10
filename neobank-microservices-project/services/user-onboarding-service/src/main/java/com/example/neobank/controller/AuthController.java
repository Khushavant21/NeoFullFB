package com.example.neobank.controller;

import com.example.neobank.config.JwtUtil;
import com.example.neobank.dto.*;
import com.example.neobank.entity.User;
import com.example.neobank.repository.UserRepository;
import com.example.neobank.services.FileUploadService;
import com.example.neobank.services.OtpService;
import com.example.neobank.services.PasswordService;
import com.example.neobank.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController
{

    private final UserService userService;
    private final OtpService otpService;
    private final PasswordService passwordService;
    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;
    private final FileUploadService fileUploadService;

    public AuthController(UserService userService,
                          OtpService otpService,
                          PasswordService passwordService,
                          JwtUtil jwtUtil,
                          UserRepository userRepository,
                          FileUploadService fileUploadService) {

        this.userService = userService;
        this.otpService = otpService;
        this.passwordService = passwordService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.fileUploadService = fileUploadService;
    }


    // ------------------------- REGISTER -------------------------
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req)
    {
        if (req.getEmail() == null || req.getFullName() == null)
        {
            return ResponseEntity.badRequest().body(Map.of("error", "Full name and email are required"));
        }

        try
        {
            User u = new User();
            u.setFullName(req.getFullName());
            u.setEmail(req.getEmail());
            u.setMobile(req.getMobile());
            u.setDob(req.getDob());
            u.setGender(req.getGender());
            userService.createUserDraft(u);

            return ResponseEntity.ok(Map.of(
                    "email", req.getEmail(),
                    "message", "User created successfully! Proceed to Aadhaar OTP."
            ));

        }
        catch (org.springframework.dao.DuplicateKeyException e)
        {
            return ResponseEntity.status(409).body(Map.of("error", "User already exists with this email."));
        }
        catch (RuntimeException e)
        {
            if (e.getMessage().contains("exists"))
            {
                return ResponseEntity.status(409).body(Map.of("error", "User already exists with this email."));
            }
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
        catch (Exception e)
        {
            return ResponseEntity.status(500).body(Map.of("error", "Unexpected error: " + e.getMessage()));
        }
    }

    // --------------------- AADHAAR OTP GENERATE ---------------------
    @PostMapping("/aadhaar/generate")
    public ResponseEntity<?> generateAadhaarOtp(@RequestBody Map<String,String> body) {
        String aadhaar = body.get("aadhaar");
        String email = body.get("email");
        if (aadhaar == null || email == null)
            return ResponseEntity.badRequest().body(Map.of("error","aadhaar and email required"));

        String otp = otpService.generateOtpFor("aadhaar", email);
        return ResponseEntity.ok(Map.of("message","Aadhaar OTP generated","otp", otp));
    }


    // --------------------- AADHAAR OTP VERIFY ---------------------
    @PostMapping("/aadhaar/verify")
    public ResponseEntity<?> verifyAadhaarOtp(@RequestBody Map<String,String> body) {
        String email = body.get("email");
        String otp = body.get("otp");
        String aadhaar = body.get("aadhaar");
        if (email == null || otp == null)
            return ResponseEntity.badRequest().body(Map.of("error","email and otp required"));

        boolean ok = otpService.verifyOtp("aadhaar", email, otp);
        if (!ok) return ResponseEntity.badRequest().body(Map.of("error","Invalid or expired OTP"));

        userService.findByEmail(email).ifPresent(u -> {
            u.setAadhaarVerified(true);
            u.setAadhaar("aadhaar");
            userService.save(u);
        });
        return ResponseEntity.ok(Map.of("message","Aadhaar verified successfully"));
    }


    // --------------------- PAN OTP GENERATE ---------------------
    @PostMapping("/pan/generate")
    public ResponseEntity<?> generatePanOtp(@RequestBody Map<String, String> body)
    {
        String pan = body.get("pan");
        String email = body.get("email");

        if (pan == null || email == null)
            return ResponseEntity.badRequest().body(Map.of("error", "pan and email required"));

        String otp = otpService.generateOtpFor("pan-" + pan, email);
        System.out.println("PAN OTP (dev): " + otp);

        return ResponseEntity.ok(Map.of("message", "PAN OTP generated successfully", "otp", otp));
    }


    // --------------------- PAN OTP VERIFY ---------------------
    @PostMapping("/pan/verify")
    public ResponseEntity<?> verifyPanOtp(@RequestBody Map<String, String> body)
    {
        String email = body.get("email");
        String pan = body.get("pan");
        String otp = body.get("otp");

        if (email == null || pan == null || otp == null)
            return ResponseEntity.badRequest().body(Map.of("error", "email, pan, and otp are required"));

        boolean ok = otpService.verifyOtp("pan-" + pan, email, otp);
        if (!ok)
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid or expired OTP"));

        var userOpt = userService.findByEmail(email);
        if (userOpt.isEmpty())
            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));

        User user = userOpt.get();
        user.setPan(pan);
        user.setPanVerificationPending(true);
        user.setPanVerified(false);
        userService.save(user);

        return ResponseEntity.ok(Map.of("message", "PAN verified. Waiting for Admin approval."));
    }


    // --------------------- LOGIN ---------------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req)
    {
        var maybe = userService.findByEmail(req.getCustomerIdOrEmail());
        if (maybe.isEmpty())
        {
            maybe = userService.findByCustomerId(req.getCustomerIdOrEmail());
        }
        if (maybe.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error","user not found"));

        var user = maybe.get();
        boolean ok = userService.checkPassword(user, req.getPassword());
        if (!ok)
        {
            return ResponseEntity.badRequest().body(Map.of("error", "invalid credentials"));
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole());
        response.put("customerId", user.getCustomerId());
        response.put("kycStatus", user.getKycStatus());


        return ResponseEntity.ok(response);
    }


    // --------------------- FORGOT PASSWORD ---------------------
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgot(@RequestBody Map<String,String> body)
    {
        String email = body.get("email");
        if (email == null) return ResponseEntity.badRequest().body(Map.of("error","email required"));
        String token = passwordService.createResetTokenFor(email);
        return ResponseEntity.ok(Map.of("message","reset token sent to email (dev)", "token", token));
    }


    // --------------------- RESET PASSWORD ---------------------
    @PostMapping("/reset-password")
    public ResponseEntity<?> reset(@RequestBody ResetPasswordRequest req)
    {
        boolean ok = passwordService.resetPassword(req.getToken(), req.getNewPassword());
        if (!ok) return ResponseEntity.badRequest().body(Map.of("error","invalid/expired token"));
        return ResponseEntity.ok(Map.of("message","password reset success"));
    }
    //NEW: KYC FILE UPLOAD API (NOW INSIDE AUTHCONTROLLER)

    @PostMapping("/kyc/upload/{customerId}")
    public ResponseEntity<?> uploadKycFilesByCustomerId(
            @PathVariable String customerId,
            @RequestParam("photo") MultipartFile photo,
            @RequestParam("signature") MultipartFile signature
    )
    {
        System.out.println("KYC API HIT by customerId: " + customerId);

        try
        {
            // 🔍 User find by customerId
            var userOpt = userService.findByCustomerId(customerId);
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "error", "User not found with customerId"
                ));
            }

            User user = userOpt.get();

            // 📤 Uploading files
            String photoUrl = fileUploadService.uploadFile(photo);
            String signatureUrl = fileUploadService.uploadFile(signature);

            // 💾 Save to DB
            user.setAadhaarPhotoUrl(photoUrl);
            user.setSignatureUrl(signatureUrl);

            userService.save(user);

            return ResponseEntity.ok(Map.of(
                    "message", "KYC images uploaded successfully",
                    "photoUrl", photoUrl,
                    "signatureUrl", signatureUrl
            ));

        }
        catch (Exception e)
        {
            return ResponseEntity.status(500).body(Map.of(
                    "error", e.getMessage()
            ));
        }
    }

    @GetMapping("/admin/kyc/all")
    public ResponseEntity<?> getAllKycUsers()
    {
        List<Map<String, Object>> response = userRepository.findAll().stream()
                .filter(u -> u.getAadhaarPhotoUrl() != null && u.getSignatureUrl() != null)
                .map(u -> Map.<String, Object>of(
                        "id", u.getId(),
                        "name", u.getFullName(),
                        "customerId", u.getCustomerId(),
                        "aadhaarPhotoUrl", u.getAadhaarPhotoUrl(),
                        "signatureUrl", u.getSignatureUrl(),
                        "status",
                        (u.isAadhaarVerified() && u.isPanVerified())
                                ? "Approved"
                                : (u.isPanVerificationPending() ? "Pending" : "Not Submitted")
                ))
                .toList();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/admin/kyc/approve/{customerId}")
    public ResponseEntity<?> approveKyc(@PathVariable String customerId)
    {
        try {
            userService.approveKyc(customerId);
            return ResponseEntity.ok(Map.of("message", "KYC Approved and account details emailed", "customerId", customerId));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }


    @PostMapping("/admin/kyc/reject/{customerId}")
    public ResponseEntity<?> rejectKyc(@PathVariable String customerId,
                                       @RequestBody(required = false) Map<String, String> body)
    {
        String reason = (body != null && body.containsKey("reason")) ? body.get("reason") : "Not specified";
        try {
            userService.rejectKyc(customerId, reason);
            return ResponseEntity.ok(Map.of("message", "KYC Rejected and email sent", "customerId", customerId, "reason", reason));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/admin/kyc/summary")
    public ResponseEntity<?> getKycSummary()
    {
        long total = userRepository.count();
        long pending = userRepository.countByKycStatus("PENDING");
        long approved = userRepository.countByKycStatus("APPROVED");
        long rejected = userRepository.countByKycStatus("REJECTED");

        return ResponseEntity.ok(Map.of(
                "total", total,
                "pending", pending,
                "approved", approved,
                "rejected", rejected
        ));
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestParam String email) {
        java.util.Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userOpt.get());
    }

    @PostMapping("/profile/upload")
    public ResponseEntity<String> uploadProfileImage(@RequestParam("file") MultipartFile file, @RequestParam String email) {
        try {
            java.util.Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            User user = userOpt.get();

            // Save file to a directory or cloud storage (simplified for demo)
            String fileName = email + "_" + System.currentTimeMillis() + ".jpg";
            // In a real application, you'd save to a proper location
            String imageUrl = "/uploads/" + fileName; // Placeholder URL

            user.setProfileImageUrl(imageUrl);
            userRepository.save(user);

            return ResponseEntity.ok("Profile image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to upload image");
        }
    }
}

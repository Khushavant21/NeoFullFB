package com.example.neobank.controller;

import com.example.neobank.config.JwtUtil;
import com.example.neobank.dto.*;
import com.example.neobank.entity.User;
import com.example.neobank.entity.ClientProfileInfo;
import com.example.neobank.entity.AdminUserInfo; // ✅ Added
import com.example.neobank.repository.UserRepository;
import com.example.neobank.repository.ClientProfileInfoRepository;
import com.example.neobank.repository.AdminUserInfoRepository; // ✅ Added
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

import com.example.neobank.services.AccessLogService;
import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController
{

    private final UserService userService;
    private final OtpService otpService;
    private final PasswordService passwordService;
    private final JwtUtil jwtUtil;
    private final AccessLogService accessLogService;

    private final UserRepository userRepository;
    private final ClientProfileInfoRepository clientProfileInfoRepository;
    private final com.example.neobank.repository.AdminUserInfoRepository adminUserInfoRepository; // ✅ Added
    private final FileUploadService fileUploadService;

    public AuthController(UserService userService,
                          OtpService otpService,
                          PasswordService passwordService,
                          JwtUtil jwtUtil,
                          AccessLogService accessLogService,
                          UserRepository userRepository,
                          ClientProfileInfoRepository clientProfileInfoRepository,
                          com.example.neobank.repository.AdminUserInfoRepository adminUserInfoRepository, // ✅ Added
                          FileUploadService fileUploadService) {

        this.userService = userService;
        this.otpService = otpService;
        this.passwordService = passwordService;
        this.jwtUtil = jwtUtil;
        this.accessLogService = accessLogService;
        this.userRepository = userRepository;
        this.clientProfileInfoRepository = clientProfileInfoRepository;
        this.adminUserInfoRepository = adminUserInfoRepository; // ✅ Added
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

            // Create ClientProfileInfo
            ClientProfileInfo profile = new ClientProfileInfo();
            profile.setEmail(req.getEmail());
            profile.setFullName(req.getFullName());
            profile.setMobile(req.getMobile());
            profile.setDob(req.getDob());
            profile.setGender(req.getGender());
            clientProfileInfoRepository.save(profile);

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
            u.setAadhaar(aadhaar); // ✅ FIX: Use actual aadhaar number
            userService.save(u);
            
            // ✅ Sync to ClientProfileInfo immediately
            clientProfileInfoRepository.findByEmail(email).ifPresent(profile -> {
                profile.setAadhaar(aadhaar);
                clientProfileInfoRepository.save(profile);
            });

            // ✅ Sync to AdminUserInfo immediately
            adminUserInfoRepository.findByEmail(email).ifPresentOrElse(adminUser -> {
                adminUser.setAadhaar(aadhaar); // Update Aadhaar
                adminUserInfoRepository.save(adminUser);
            }, () -> {
                // If not found (rare case if sync missed), create new
                AdminUserInfo newUser = new AdminUserInfo();
                newUser.setEmail(email);
                newUser.setFullName(u.getFullName());
                newUser.setMobile(u.getMobile());
                newUser.setAadhaar(aadhaar);
                newUser.setStatus("Pending"); // Default
                adminUserInfoRepository.save(newUser);
            });
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
    public ResponseEntity<?> login(@RequestBody LoginRequest req, HttpServletRequest request)
    {
        // Trim input to remove accidental spaces
        String identifier = req.getCustomerIdOrEmail() != null ? req.getCustomerIdOrEmail().trim() : "";

        var maybe = userService.findByEmail(identifier);
        if (maybe.isEmpty())
        {
            maybe = userService.findByCustomerId(identifier);
        }
        if (maybe.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error","user not found"));

        var user = maybe.get();
        boolean ok = userService.checkPassword(user, req.getPassword());
        if (!ok)
        {
            accessLogService.recordLog(user.getEmail(), request, "failed");
            return ResponseEntity.badRequest().body(Map.of("error", "invalid credentials"));
        }

        // Record successful login
        accessLogService.recordLog(user.getEmail(), request, "success");

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("role", user.getRole());
        response.put("customerId", user.getCustomerId());
        response.put("email", user.getEmail()); // ✅ return email for frontend context
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
    public ResponseEntity<ClientProfileInfo> getUserProfile(@RequestParam String email) {
        java.util.Optional<ClientProfileInfo> opt = clientProfileInfoRepository.findByEmail(email);
        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        }

        // Fallback or Sync from User if missing
        java.util.Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User u = userOpt.get();
            ClientProfileInfo profile = new ClientProfileInfo();
            profile.setEmail(u.getEmail());
            profile.setFullName(u.getFullName());
            profile.setMobile(u.getMobile());
            profile.setDob(u.getDob());
            profile.setGender(u.getGender());
            profile.setProfileImageUrl(u.getProfileImageUrl());
            profile.setAadhaar(u.getAadhaar()); // ✅ Sync Aadhaar
            clientProfileInfoRepository.save(profile);
            return ResponseEntity.ok(profile);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/profile/update")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        if (email == null) return ResponseEntity.badRequest().body(Map.of("error", "Email required"));

        var opt = clientProfileInfoRepository.findByEmail(email);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        ClientProfileInfo profile = opt.get();
        
        // 👋 Security: Only allow address updates from client side profile page
        if (body.containsKey("address")) {
            profile.setAddress(body.get("address"));
            clientProfileInfoRepository.save(profile);
            
            // Sync to User entity as well
            userRepository.findByEmail(email).ifPresent(u -> {
                // If User entity had address (not in current entity, but good practice if added later)
                // u.setAddress(body.get("address")); 
                userRepository.save(u);
            });
            
            // Sync to AdminUserInfo
            userRepository.findByEmail(email).ifPresent(u -> {
                adminUserInfoRepository.findByEmail(email).ifPresent(adminUser -> {
                    adminUser.setAddress(body.get("address"));
                    adminUserInfoRepository.save(adminUser);
                });
            });
        }

        return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
    }

    @PostMapping("/profile/upload")
    public ResponseEntity<Map<String, String>> uploadProfileImage(@RequestParam("file") MultipartFile file, @RequestParam String email) {
        try {
            java.util.Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("error", "User not found"));
            }
            User user = userOpt.get();

            // Upload using FileUploadService (Cloudinary)
            String imageUrl = fileUploadService.uploadFile(file);

            // 5. Update User entity
            user.setProfileImageUrl(imageUrl);
            userRepository.save(user);

            // 6. Update ClientProfileInfo entity if exists
            java.util.Optional<ClientProfileInfo> profileOpt = clientProfileInfoRepository.findByEmail(email);
            if (profileOpt.isPresent()) {
                ClientProfileInfo profile = profileOpt.get();
                profile.setProfileImageUrl(imageUrl);
                clientProfileInfoRepository.save(profile);
            } else {
                 // Create if missing
                ClientProfileInfo profile = new ClientProfileInfo();
                profile.setEmail(user.getEmail());
                profile.setFullName(user.getFullName());
                profile.setMobile(user.getMobile());
                profile.setDob(user.getDob());
                profile.setGender(user.getGender());
                profile.setProfileImageUrl(imageUrl);
                clientProfileInfoRepository.save(profile);
            }

            // 7. Return JSON with the new URL
            return ResponseEntity.ok(Map.of("profileImageUrl", imageUrl));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Failed to upload image: " + e.getMessage()));
        }
    }
}

package com.example.neobank.controller;

import com.example.neobank.entity.AccessLog;
import com.example.neobank.repository.AccessLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/access-logs")
@CrossOrigin(origins = "*") // Adjust as per your security config
public class AccessLogController {

    @Autowired
    private AccessLogRepository accessLogRepository;

    @GetMapping("/{email}")
    public List<AccessLog> getLogs(@PathVariable String email) {
        return accessLogRepository.findByEmailOrderByCreatedAtDesc(email);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addLog(@RequestBody AccessLog log) {
        accessLogRepository.save(log);
        return ResponseEntity.ok(Map.of("message", "Log saved successfully"));
    }
}

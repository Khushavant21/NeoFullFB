package com.example.neobank.services;

import com.example.neobank.entity.AccessLog;
import com.example.neobank.repository.AccessLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;

@Service
public class AccessLogService {

    @Autowired
    private AccessLogRepository accessLogRepository;

    @Autowired
    private UserAgentService userAgentService;

    @Autowired
    private GeoLocationService geoLocationService;

    public void recordLog(String email, HttpServletRequest request, String status) {
        System.out.println("Recording log for email: " + email + " with status: " + status);
        String ip = getClientIp(request);
        String userAgent = request.getHeader("User-Agent");
        System.out.println("IP: " + ip + " | User-Agent: " + userAgent);

        AccessLog log = new AccessLog();
        log.setEmail(email);
        log.setTimestamp(Instant.now());
        log.setIp(ip);
        log.setStatus(status);

        try {
            Map<String, String> agentInfo = userAgentService.parse(userAgent);
            log.setDeviceType(agentInfo.get("deviceType"));
            
            // Cleanup OS String
            String os = agentInfo.get("os");
            if (os != null) {
                if (os.contains("Windows NT")) {
                    // Simple mapping or cleanup
                    os = os.replace("Windows NT ??", "Windows"); 
                    // Yauaa sometimes returns "Windows NT ??" for unknown versions
                }
            }
            log.setOs(os);
            
            log.setBrowser(agentInfo.get("browser"));
        } catch (Exception e) {
            System.err.println("User-Agent parsing failed: " + e.getMessage());
            log.setDeviceType("Unknown");
            log.setOs("Unknown");
            log.setBrowser("Unknown");
        }

        try {
            Map<String, String> geoInfo = geoLocationService.getApproximateLocation(ip);
            log.setCity(geoInfo.get("city"));
            log.setRegion(geoInfo.get("region"));
            log.setCountry(geoInfo.get("country"));
            log.setTimezone(geoInfo.get("timezone"));
            log.setIsp(geoInfo.get("isp"));
        } catch (Exception e) {
            System.err.println("GeoLocation service failed: " + e.getMessage());
            log.setCity("Unknown");
        }

        accessLogRepository.save(log);
        System.out.println("Access log saved for: " + email);
    }

    private String getClientIp(HttpServletRequest request) {
        String remoteAddr = request.getHeader("X-Forwarded-For");
        if (remoteAddr == null || remoteAddr.isEmpty()) {
            remoteAddr = request.getRemoteAddr();
        } else {
            // If multiple proxies, first one is actual client
            remoteAddr = remoteAddr.split(",")[0].trim();
        }
        return remoteAddr;
    }
}

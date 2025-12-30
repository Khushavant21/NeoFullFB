package com.example.neobank.services;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Service
public class GeoLocationService {

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, String> getApproximateLocation(String ip) {
        try {
            // Using ipapi.co for server-side geolocation
            String url = "https://ipapi.co/" + ip + "/json/";
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);

            if (response != null) {
                return Map.of(
                    "city", String.valueOf(response.getOrDefault("city", "Unknown")),
                    "region", String.valueOf(response.getOrDefault("region", "Unknown")),
                    "country", String.valueOf(response.getOrDefault("country_name", "Unknown")),
                    "timezone", String.valueOf(response.getOrDefault("timezone", "UTC")),
                    "isp", String.valueOf(response.getOrDefault("org", "Unknown"))
                );
            }
        } catch (Exception e) {
            System.err.println("GeoLocation error for IP " + ip + ": " + e.getMessage());
        }
        return Map.of("city", "Unknown", "region", "Unknown", "country", "Unknown");
    }
}

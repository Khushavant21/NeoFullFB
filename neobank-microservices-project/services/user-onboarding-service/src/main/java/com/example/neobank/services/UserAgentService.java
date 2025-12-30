package com.example.neobank.services;

import nl.basjes.parse.useragent.UserAgent;
import nl.basjes.parse.useragent.UserAgentAnalyzer;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserAgentService {

    private UserAgentAnalyzer uaa;

    @PostConstruct
    public void init() {
        this.uaa = UserAgentAnalyzer
                .newBuilder()
                .withCache(1000)
                .build();
    }

    public Map<String, String> parse(String userAgentString) {
        UserAgent agent = uaa.parse(userAgentString);
        Map<String, String> result = new HashMap<>();
        
        result.put("deviceType", agent.getValue(UserAgent.DEVICE_CLASS)); // e.g., Desktop, Mobile, Tablet
        result.put("os", agent.getValue(UserAgent.OPERATING_SYSTEM_NAME_VERSION));
        result.put("browser", agent.getValue(UserAgent.AGENT_NAME_VERSION));
        
        return result;
    }
}

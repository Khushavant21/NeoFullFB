package com.example.neobank.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.Arrays;

@Configuration
public class CorsConfig
{
    @Bean
    public CorsFilter corsFilter()
    {
        CorsConfiguration config = new CorsConfiguration();

        // ✅ Allow frontend origin (update if deployed)
        config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));

        // ✅ Allow credentials (cookies / headers)
        config.setAllowCredentials(true);

        // ✅ Allow headers and methods
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        // ✅ Expose headers (optional, useful for tokens)
        config.addExposedHeader("Authorization");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}

package com.example.neobank.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig
{
    @Bean
    public Cloudinary cloudinary()
    {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dvjdd7ko9",
                "api_key", "247199496627934",
                "api_secret", "dxr3nmp0z5MXttljLPVX2NBhp8w"
        ));
    }
}

package com.example.neobank.dto;

import com.example.neobank.entity.User;
import com.example.neobank.entity.ClientProfileInfo;
import lombok.Data;

@Data
public class AdminDetailDTO {
    private User user;
    private ClientProfileInfo clientProfile;

    public AdminDetailDTO(User user, ClientProfileInfo clientProfile) {
        this.user = user;
        this.clientProfile = clientProfile;
    }
}

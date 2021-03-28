package com.example.codecrumbsbackend.Models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessToken {
    private String userId;
    private String accessToken;
}

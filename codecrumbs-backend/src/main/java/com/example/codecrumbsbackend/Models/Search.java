package com.example.codecrumbsbackend.Models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Search {
    private String searchId;

    private String associatedUserId;
    private String associatedProjectName;
    private String websiteName;
    private String websiteUrl;
    private String timeAccessed;
    private String timeAccessedFormat;
    private String imageUrl;

    //Only required if it is starred
    private boolean starred;
}

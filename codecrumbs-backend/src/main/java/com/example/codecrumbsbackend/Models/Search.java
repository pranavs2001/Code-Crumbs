package com.example.codecrumbsbackend.Models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Search {
    private String websiteId;

    private String associatedUserId;
    private String associatedProjectName;
    private String websiteName;
    private String websiteUrl;
    private String timeAccessed;
    private String timeAccessedFormat;

    //Only required if it is starred
    private boolean starred;
    private String commitId;
}

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
    private boolean starred;
}

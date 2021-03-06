package com.example.codecrumbsbackend.Models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    private String name;

    private String associatedUserId;
    private String timeOfCreation;
    private String timeOfCreationFormat;
    private int numberOfSearches;
}

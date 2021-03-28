package com.example.codecrumbsbackend.Models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Limit {
    private int limit;

    private ProjectUser projectUser;
    private String associatedSearchId; //not required if getting list of searches, only required for list of comments
}

package com.example.codecrumbsbackend.Models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    private String name;

    private String timeOfCreation;
    private boolean active; // current project being tracked?
}

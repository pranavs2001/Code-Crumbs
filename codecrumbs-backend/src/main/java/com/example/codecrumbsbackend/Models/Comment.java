package com.example.codecrumbsbackend.Models;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    private String content;

    private String timeStamp;
    private String timeStampFormat;
    private String associatedSearchId;
    private ProjectUser projectUser;
    private String commentId;

}

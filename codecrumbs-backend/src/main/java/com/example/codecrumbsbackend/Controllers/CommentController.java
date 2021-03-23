package com.example.codecrumbsbackend.Controllers;

import com.example.codecrumbsbackend.Models.Comment;
import com.example.codecrumbsbackend.Models.Limit;
import com.example.codecrumbsbackend.Repositories.CommentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @PostMapping("/new-comment")
    public Comment postNewComment(@RequestBody Comment comment) {
        return commentRepository.postNewComment(comment);
    }

    @GetMapping("/most-recent-limited-comments")
    public List<Comment> getMostRecentCommentsLimited(@RequestBody Limit limit) {
        return commentRepository.getMostRecentCommentsLimited(limit.getLimit(), limit.getProjectUser(), limit.getAssociatedSearchId());
    }
}

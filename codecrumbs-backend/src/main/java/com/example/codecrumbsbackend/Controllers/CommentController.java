package com.example.codecrumbsbackend.Controllers;

import com.example.codecrumbsbackend.Models.Comment;
import com.example.codecrumbsbackend.Models.Limit;
import com.example.codecrumbsbackend.Repositories.CommentRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
public class CommentController {

    @Autowired
    CommentRepository commentRepository;

    @ApiOperation(value = "Creates new comment -- REQUIRED: associatedSearchId, content, projectUser")
    @PostMapping("/new-comment")
    public Comment postNewComment(@RequestBody Comment comment) {
        return commentRepository.postNewComment(comment);
    }

    @ApiOperation(value = "Returns specified number of most recent comments -- REQUIRED: associatedSearchId, limit, projectUser")
    @GetMapping("/most-recent-limited-comments")
    public List<Comment> getMostRecentCommentsLimited(@RequestBody Limit limit) {
        return commentRepository.getMostRecentCommentsLimited(limit.getLimit(), limit.getProjectUser(), limit.getAssociatedSearchId());
    }

    @ApiOperation(value = "Deletes comment - REQUIRED: associatedSearchId, commentId, projectUser")
    @DeleteMapping("/delete-comment")
    public Comment deleteComment(@RequestBody Comment comment) {
        return commentRepository.deleteComment(comment);
    }
}

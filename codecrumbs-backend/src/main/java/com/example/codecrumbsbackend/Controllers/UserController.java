package com.example.codecrumbsbackend.Controllers;

import com.example.codecrumbsbackend.Models.User;
import com.example.codecrumbsbackend.Repositories.UserRepository;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@Slf4j
public class UserController {

    @Autowired
    UserRepository userRepository;

    @ApiOperation(value = "Creates new user -- REQUIRED: email, githubAccessToken, name, occupation, userId (make sure this is the userId from Firebase AUTH)")
    @PostMapping("/new-user")
    public User postNewUser(@RequestBody User user) throws IOException {
        return userRepository.postNewUser(user);
    }

    @ApiOperation(value = "Gets all info about a user -- REQUIRED PATH VARIABLE: userId (same userId from Firebase AUTH")
    @GetMapping("/user-info/{userId}")
    public User getUserInfo(@PathVariable("userId") String userId) {
        return userRepository.getUserInfo(userId);
    }

    //Deleting a user?
}

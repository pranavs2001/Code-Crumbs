package com.example.codecrumbsbackend.Controllers;

import com.example.codecrumbsbackend.Models.User;
import com.example.codecrumbsbackend.Repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@Slf4j
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping("/new-user")
    public User postNewUser(@RequestBody User user) throws IOException {
        return userRepository.postNewUser(user);
    }

    @GetMapping("/user-info/{userId}")
    public User getUserInfo(@PathVariable("userId") String userId) {
        return userRepository.getUserInfo(userId);
    }
}

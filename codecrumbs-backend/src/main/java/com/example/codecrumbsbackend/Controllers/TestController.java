package com.example.codecrumbsbackend.Controllers;

import com.example.codecrumbsbackend.Models.User;
import com.example.codecrumbsbackend.Repositories.FirebaseService;
import com.example.codecrumbsbackend.Repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
public class TestController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/test")
    public String returnTrue() {
        return "NICE";
    }

    @PostMapping("/new-user")
    public User postNewUser(@RequestBody User user) {
        return userRepository.postNewUser(user);
    }
}

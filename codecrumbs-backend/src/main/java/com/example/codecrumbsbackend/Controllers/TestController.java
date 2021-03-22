package com.example.codecrumbsbackend.Controllers;

import java.util.HashMap;
import java.util.Map;

import javax.print.attribute.HashAttributeSet;

import com.example.codecrumbsbackend.Models.User;
import com.example.codecrumbsbackend.Repositories.FirebaseService;
import com.example.codecrumbsbackend.Repositories.UserRepository;

import lombok.Getter;
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

//Github API endpoints:
    //Get github auth link for user to accept/decline the scope of capabilities the app wants
    //Better than hardcoding into the frontend since changes to the API can be reflected easily in the
    //app.yaml file
    //The client id and secret are environment variables for security purposes, found in app.yaml
    @GetMapping("/Github-auth-link")
    public Map<String, String> getGithubAuthLink() {
        String githubAuthUrl = System.getenv("GITHUB_APP_AUTH_LINK") + "?";
        githubAuthUrl += System.getenv("GITHUB_APP_AUTH_SCOPE") + "&";
        githubAuthUrl += "client_id=" + System.getenv("GITHUB_APP_CLIENT_ID");
        HashMap<String, String> map = new HashMap<>();
        map.put("Status", "Success");
        map.put("URL", githubAuthUrl);
        return map;
    }
}

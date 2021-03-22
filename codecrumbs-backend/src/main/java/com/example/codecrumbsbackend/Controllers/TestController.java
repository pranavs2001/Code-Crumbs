package com.example.codecrumbsbackend.Controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

import javax.print.attribute.HashAttributeSet;

import com.example.codecrumbsbackend.Models.User;
import com.example.codecrumbsbackend.Repositories.FirebaseService;
import com.example.codecrumbsbackend.Repositories.UserRepository;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import org.apache.tomcat.util.json.JSONParser;
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

    @GetMapping("/Github-auth-callback")
    public Map<String, String> getGithubAuthCallback(@RequestParam String code) {
        String urlBase = System.getenv("GITHUB_APP_AUTH_ACCESS_TOKEN_LINK");
        HashMap<String, String> map = new HashMap<>();
        try {
            URL url = new URL(System.getenv(urlBase));
            HttpURLConnection post = (HttpURLConnection)url.openConnection();
            post.setRequestMethod("POST");
            post.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            post.setRequestProperty("Accept", "application/json");
            post.setDoOutput(true);

            HashMap<String, String> urlParams = new HashMap<>();
            urlParams.put("client_id", System.getenv("GITHUB_APP_CLIENT_ID"));
            urlParams.put("client_secret", System.getenv("GITHUB_APP_CLIENT_SECRET"));
            urlParams.put("code", code);

            StringJoiner s = new StringJoiner("&");
            for(Map.Entry<String, String> temp : urlParams.entrySet()) {
                s.add(URLEncoder.encode(temp.getKey(), "UTF-8") + "=" + URLEncoder.encode(temp.getValue(), "UTF-8"));
            }

            byte[] output = s.toString().getBytes(StandardCharsets.UTF_8);
            post.setFixedLengthStreamingMode(output.length);
            post.connect();

            try(OutputStream os = post.getOutputStream()) {
                os.write(output);
            }

            try(BufferedReader bf = new BufferedReader(new InputStreamReader(post.getInputStream(), "utf-8"))) {
                StringBuilder response = new StringBuilder();
                String responseLine = null;
                while ((responseLine = bf.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                String finalResponse = response.toString();
                String[] responseComponents = finalResponse.split("&");
                String accessToken = responseComponents[0].split("=")[1];
            }
        } catch (Exception e) {
            map.put("Status", "Error: " + e.getLocalizedMessage());
        }
        return map;
    }
}

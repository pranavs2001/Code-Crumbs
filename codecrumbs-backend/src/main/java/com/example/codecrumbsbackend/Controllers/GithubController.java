package com.example.codecrumbsbackend.Controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import com.google.gson.*;

import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

import javax.print.attribute.HashAttributeSet;
import javax.xml.ws.RequestWrapper;

import com.example.codecrumbsbackend.Models.User;
import com.example.codecrumbsbackend.Repositories.FirebaseService;
import com.example.codecrumbsbackend.Repositories.UserRepository;
import com.example.codecrumbsbackend.Utils.Utils;
import com.google.common.base.Optional;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
public class GithubController {

    @Autowired
    UserRepository userRepository;
//Github endpoints:
    //Get github auth link for user to accept/decline the scope of capabilities the app wants
    //Better than hardcoding into the frontend since changes to the API can be reflected easily in the
    //app.yaml file
    //The client id and secret are environment variables for security purposes, found in app.yaml
    @GetMapping("/Github-auth-link")
    public Map<String, String> getGithubAuthLink() {
        String githubAuthUrl = Utils.GITHUB_APP_AUTH_LINK + "?";
        githubAuthUrl += Utils.GITHUB_APP_AUTH_SCOPE + "&";
        githubAuthUrl += "client_id=" + System.getenv("GITHUB_APP_CLIENT_ID");
        HashMap<String, String> map = new HashMap<>();
        map.put("Status", "Success");
        map.put("URL", githubAuthUrl);
        return map;
    }

    @GetMapping("/Github-auth-callback")
    public Map<String, String> getGithubAuthCallback(@RequestParam String code) {
        String urlBase = Utils.GITHUB_APP_AUTH_ACCESS_TOKEN_LINK;
        HashMap<String, String> map = new HashMap<>();
        try {
            HashMap<String, String> urlParams = new HashMap<>();
            urlParams.put("client_id", System.getenv("GITHUB_APP_CLIENT_ID"));
            urlParams.put("client_secret", System.getenv("GITHUB_APP_CLIENT_SECRET"));
            urlParams.put("code", code);

            String finalResponse = postHelper(urlBase, urlParams);
            
            if(finalResponse.substring(0, 6) == "Error") {
                map.put("Status", finalResponse);
            } else {
                String[] responseComponents = finalResponse.split("&");
                String accessToken = responseComponents[0].split("=")[1];
                map.put("Status", "Success");
                map.put("AccessToken", accessToken);
            }
        } catch (Exception e) {
            map.put("Status", "Error: " + e.getLocalizedMessage());
        }
        return map;
    }

    @PostMapping("/Github-access-token-response")
    public Map<String, String> postAccessToken(@RequestParam Map<String, String> allParams) {
        String userId = allParams.get("userId");
        String accessToken = allParams.get("access_token");

        Map<String, String> temp = new HashMap<>();
        temp.put("access_token", accessToken);
        Map<String, Object> finalParams = new HashMap<>(temp);

        userRepository.setUserField(userId, finalParams);

        HashMap<String, String> returnMap = new HashMap<>();
        returnMap.put("Status", "Success");
        return returnMap;
    }

    @GetMapping("/Github-get-repos")
    public Map<String, String> getUserRepos(@RequestParam String userId) {
        HashMap<String, String> returnMap = new HashMap<>();
        
        String accessToken = userRepository.getUserInfo(userId).getGithubAccessToken();
        String urlResource = Utils.GITHUB_API_BASE_URL + Utils.GITHUB_API_REPO_ENDPOINT;

        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("access_token", accessToken);
        paramMap.put("visibility", "all");
        paramMap.put("sort", "full_name");
        paramMap.put("per_page", "100");

        String finalResponse = postHelper(urlResource, paramMap);
        
        if(finalResponse.substring(0, 6) == "Error") {
            returnMap.put("Status", finalResponse);
        } else {
            returnMap.put("Status", "Success");
            returnMap.put("Repos", finalResponse);
        }

        return returnMap;
    }

    @GetMapping("/Github-get-commits")
    public Map<String, String> getUserCommits(@RequestParam String userId, @RequestParam String owner, 
                                                @RequestParam String repo, @RequestParam String since) {
        HashMap<String, String> returnMap = new HashMap<>();

        String accessToken = userRepository.getUserInfo(userId).getGithubAccessToken();
        String urlResource = Utils.GITHUB_API_BASE_URL + "/";
        urlResource += Utils.GITHUB_API_COMMIT_ENDPOINT.split("/")[0];
        urlResource += owner;
        urlResource += repo;
        urlResource += Utils.GITHUB_API_COMMIT_ENDPOINT.split("/")[1];

        Map<String, String> paramMap = new HashMap<>();
        paramMap.put("access_token", accessToken);
        paramMap.put("since", since);

        String finalResponse = postHelper(urlResource, paramMap);

        if(finalResponse.substring(0, 6) == "Error") {
            returnMap.put("Status", finalResponse);
        } else {
            returnMap.put("Status", "Success");
            returnMap.put("Repos", finalResponse);
        }

        return returnMap;
    }


    private String postHelper(String urlResource, Map<String, String> paramMap) {
        try {
            URL url = new URL(urlResource);
            HttpURLConnection post = (HttpURLConnection)url.openConnection();
            post.setRequestMethod("POST");
            post.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            post.setRequestProperty("Accept", "application/json");
            post.setDoOutput(true);

            StringJoiner s = new StringJoiner("&");
            for(Map.Entry<String, String> temp : paramMap.entrySet()) {
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
                return finalResponse;
            }        
        } catch (Exception e) {
            return "Error" + e.getLocalizedMessage();
        }
    }
}

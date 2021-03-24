//package com.example.codecrumbsbackend.Controllers;
//
//import java.io.BufferedReader;
//import java.io.IOException;
//import java.io.InputStream;
//import java.io.InputStreamReader;
//import java.io.OutputStream;
//import java.net.HttpURLConnection;
//import com.google.gson.*;
//
//import java.net.MalformedURLException;
//import java.net.URL;
//import java.net.URLConnection;
//import java.net.URLEncoder;
//import java.nio.charset.StandardCharsets;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.StringJoiner;
//
//import javax.print.attribute.HashAttributeSet;
//import com.example.codecrumbsbackend.Models.AccessToken;
//import com.example.codecrumbsbackend.Models.Repository;
//import com.example.codecrumbsbackend.Models.Commit;
//
//import com.example.codecrumbsbackend.Models.User;
//import com.example.codecrumbsbackend.Repositories.FirebaseService;
//import com.example.codecrumbsbackend.Repositories.UserRepository;
//import com.example.codecrumbsbackend.Utils.Utils;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.node.JsonNodeFactory;
//import com.fasterxml.jackson.databind.node.ObjectNode;
//import com.google.api.client.json.Json;
//import com.google.common.base.Optional;
//
//import lombok.Getter;
//import lombok.val;
//import lombok.extern.slf4j.Slf4j;
//
//import org.apache.tomcat.util.json.JSONParser;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.web.servlet.error.ErrorController;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@Slf4j
//public class GithubController implements ErrorController {
//
//    @Autowired
//    UserRepository userRepository;
//
//    private static final String PATH = "/error";
//
//    @RequestMapping(value = PATH)
//    public String errorMessage() {
//        return "<p><span style=\"background-color: #ff0000;\">You Absolute Monkey Man</span></p><p><span style=\"background-color: #ff0000;\">What the AIDS are you doing?</span></p><p>&nbsp;</p><p><img src=\"https://i.redd.it/sfnfaudnmqo41.jpg\" alt=\"\" width=\"243\" height=\"276\" /></p>";
//    }
//
//    @Override
//    public String getErrorPath() {
//        return PATH;
//    }
//    //Github endpoints:
//    //Get github auth link for user to accept/decline the scope of capabilities the app wants
//    //Better than hardcoding into the frontend since changes to the API can be reflected easily in the
//    //app.yaml file
//    //The client id and secret are environment variables for security purposes, found in app.yaml
//    @GetMapping("/Github-auth-link")
//    public Map<String, String> getGithubAuthLink() {
//        String[] urlList = {Utils.GITHUB_APP_AUTH_LINK + "?", Utils.GITHUB_APP_AUTH_SCOPE + "&", Utils.GITHUB_API_CLIENT_ID_KEY + "=" , System.getenv("GITHUB_APP_CLIENT_ID")};
//        String githubAuthUrl = urlFormatter(urlList);
//        HashMap<String, String> map = new HashMap<>();
//        map.put(Utils.STATUS, Utils.SUCCESS);
//        map.put(Utils.URL, githubAuthUrl);
//        return map;
//    }
//
//    @GetMapping("/Github-auth-callback")
//    public Map<String, String> getGithubAuthCallback(@RequestParam String code) {
//        String urlBase = Utils.GITHUB_APP_AUTH_ACCESS_TOKEN_LINK;
//        HashMap<String, String> map = new HashMap<>();
//        try {
//            String[] keys = {Utils.GITHUB_API_CLIENT_ID_KEY, Utils.GITHUB_API_CLIENT_SECRET_KEY, Utils.GITHUB_API_CODE_KEY};
//            String[] values = {System.getenv("GITHUB_APP_CLIENT_ID"), System.getenv("GITHUB_APP_CLIENT_SECRET"), code};
//            Map<String, String> urlParams = parameterMap(keys, values);
//
//            String finalResponse = postHelper(urlBase, urlParams);
//
//            if(errorCheck(finalResponse)) {
//                map.put(Utils.STATUS, finalResponse);
//            } else {
//                JsonObject jsonobj = JsonParser.parseString(finalResponse).getAsJsonObject();
//                String accessToken = jsonobj.get(Utils.ACCESS_TOKEN).getAsString();
//                map.put(Utils.STATUS, Utils.SUCCESS);
//                map.put(Utils.ACCESS_TOKEN_KEY, accessToken);
//            }
//        } catch (Exception e) {
//            map.put(Utils.STATUS, Utils.ERROR + ": " + e.getLocalizedMessage());
//        }
//        return map;
//    }
//
//    @PostMapping("/Github-access-token-response")
//    public Map<String, String> postAccessToken(@RequestBody AccessToken accessToken) {
//        HashMap<String, String> returnMap = new HashMap<>();
//        try {
//            Map<String, String> temp = new HashMap<>();
//            temp.put(Utils.ACCESS_TOKEN, accessToken.getAccessToken());
//            Map<String, Object> finalParams = new HashMap<>(temp);
//
//            userRepository.setUserField(accessToken.getUserId(), finalParams);
//
//            returnMap.put(Utils.STATUS, Utils.SUCCESS);
//        } catch (Exception e) {
//            returnMap.put(Utils.STATUS, Utils.ERROR + ": " + e.getLocalizedMessage());
//        }
//        return returnMap;
//    }
//
//    @GetMapping("/Github-get-all-repos")
//    public ObjectNode getUserRepos(@RequestParam String userId) {
//        ObjectMapper mapper = new ObjectMapper();
//        ObjectNode objNode = mapper.createObjectNode();
//        try {
//            String accessToken = userRepository.getUserInfo(userId).getGithubAccessToken();
//            String[] urlElems = {Utils.GITHUB_API_BASE_URL, Utils.GITHUB_API_REPO_ENDPOINT};
//            String urlResource = urlFormatter(urlElems);
//
//            String[] keys = {Utils.ACCESS_TOKEN, Utils.VISIBILITY, Utils.SORT, Utils.PER_PAGE};
//            String[] values = {accessToken, Utils.ALL, Utils.FULL_NAME, Utils.HUNDRED};
//            Map<String, String> paramMap = parameterMap(keys, values);
//
//            String finalResponse = postHelper(urlResource, paramMap);
//
//            if(errorCheck(finalResponse)) {
//                objNode.put(Utils.STATUS, finalResponse);
//            } else {
//                JsonArray jsonobj = JsonParser.parseString(finalResponse).getAsJsonArray();
//                int i;
//                for(i = 0; i < jsonobj.size(); i++) {
//                    ObjectNode tempJson = mapper.createObjectNode();
//                    JsonObject temp = jsonobj.get(i).getAsJsonObject();
//                    JsonObject owner = temp.get("owner").getAsJsonObject();
//                    tempJson.put(Utils.OWNER, owner.get(Utils.LOGIN).getAsString());
//                    tempJson.put(Utils.REPO_NAME, temp.get(Utils.REPO_NAME).getAsString());
//
//                    String[] tempUrlElems = {Utils.GITHUB_API_BASE_URL + "/", Utils.GITHUB_API_COLLABORATORS_ENDPOINT.split("/")[0] + "/", tempJson.get(Utils.OWNER) + "/", tempJson.get(Utils.REPO_NAME) + "/", Utils.GITHUB_API_COLLABORATORS_ENDPOINT.split("/")[1]};
//                    urlResource = urlFormatter(tempUrlElems);
//
//                    String[] keysTemp = {Utils.PER_PAGE, Utils.ACCESS_TOKEN};
//                    String[] valuesTemp = {Utils.HUNDRED, accessToken};
//                    paramMap.clear();
//                    paramMap = parameterMap(keysTemp, valuesTemp);
//
//                    finalResponse = postHelper(urlResource, paramMap);
//
//                    if(errorCheck(finalResponse)) {
//                        continue;
//                    }
//
//                    JsonArray jsonCollaborators = JsonParser.parseString(finalResponse).getAsJsonArray();
//                    int j;
//                    ObjectNode collaboratorsArr = mapper.createObjectNode();
//                    for(j = 0; j < jsonCollaborators.size(); j++) {
//                        ObjectNode tempCollaboratorsJson = mapper.createObjectNode();
//                        JsonObject tempCollaborator = jsonCollaborators.get(i).getAsJsonObject();
//                        tempCollaboratorsJson.put(Utils.LOGIN, tempCollaborator.get(Utils.LOGIN).getAsString());
//
//                        collaboratorsArr.set(Integer.toString(j), tempCollaboratorsJson);
//                    }
//                    tempJson.set(Utils.COLLABORATORS, collaboratorsArr);
//                    tempJson.put(Utils.NUM_COLLABORATORS, Integer.toString(j));
//
//                    objNode.set(Integer.toString(i), tempJson);
//                }
//                objNode.put(Utils.STATUS, Utils.SUCCESS);
//                objNode.put(Utils.NUM_REPOS, Integer.toString(i));
//            }
//        } catch (Exception e) {
//            objNode.put(Utils.STATUS, Utils.ERROR + ": " + e.getLocalizedMessage());
//        }
//
//        return objNode;
//    }
//
//    @GetMapping("/Github-get-repo")
//    public ObjectNode getUserRepo(@RequestBody Repository repository) {
//        ObjectMapper mapper = new ObjectMapper();
//        ObjectNode objNode = mapper.createObjectNode();
//        try {
//            objNode.put(Utils.OWNER, repository.getOwner());
//            objNode.put(Utils.REPO_NAME, repository.getRepo());
//            String accessToken = userRepository.getUserInfo(repository.getUserId()).getGithubAccessToken();
//            String[] urlElems = {Utils.GITHUB_API_BASE_URL + "/", Utils.GITHUB_API_COLLABORATORS_ENDPOINT.split("/")[0] + "/", repository.getOwner() + "/", repository.getRepo() + "/", Utils.GITHUB_API_COLLABORATORS_ENDPOINT.split("/")[1]};
//            String urlResource = urlFormatter(urlElems);
//
//            String[] keys = {Utils.ACCESS_TOKEN, Utils.PER_PAGE};
//            String[] values = {accessToken, Utils.HUNDRED};
//            Map<String, String> paramMap = parameterMap(keys, values);
//
//            String finalResponse = postHelper(urlResource, paramMap);
//
//            if(errorCheck(finalResponse)) {
//                objNode.put(Utils.STATUS, finalResponse);
//            } else {
//                JsonArray jsonCollaborators = JsonParser.parseString(finalResponse).getAsJsonArray();
//                int i;
//                ObjectNode collaboratorsArr = mapper.createObjectNode();
//                for(i = 0; i < jsonCollaborators.size(); i++) {
//                    ObjectNode tempCollaboratorsJson = mapper.createObjectNode();
//                    JsonObject tempCollaborator = jsonCollaborators.get(i).getAsJsonObject();
//                    tempCollaboratorsJson.put(Utils.LOGIN, tempCollaborator.get(Utils.LOGIN).getAsString());
//                    collaboratorsArr.set(Integer.toString(i), tempCollaboratorsJson);
//                }
//                objNode.put(Utils.STATUS, Utils.SUCCESS);
//                objNode.set(Utils.COLLABORATORS, collaboratorsArr);
//                objNode.put(Utils.NUM_COLLABORATORS, Integer.toString(i));
//            }
//        } catch (Exception e) {
//            objNode.put(Utils.STATUS, Utils.ERROR + ": " + e.getLocalizedMessage());
//        }
//
//        return objNode;
//    }
//
//    @GetMapping("/Github-get-commits")
//    public ObjectNode getUserCommits(@RequestBody Commit commit) {
//        ObjectMapper mapper = new ObjectMapper();
//        ObjectNode objNode = mapper.createObjectNode();
//
//        try {
//            String accessToken = userRepository.getUserInfo(commit.getUserId()).getGithubAccessToken();
//            String[] urlElems = {Utils.GITHUB_API_BASE_URL + "/", Utils.GITHUB_API_COMMIT_ENDPOINT.split("/")[0] + "/", commit.getOwner() + "/", commit.getRepo() + "/", Utils.GITHUB_API_COMMIT_ENDPOINT.split("/")[1]};
//            String urlResource = urlFormatter(urlElems);
//
//            String[] keys = {Utils.ACCESS_TOKEN, Utils.SINCE};
//            String[] values = {accessToken, commit.getSince()};
//            Map<String, String> paramMap = parameterMap(keys, values);
//
//            String finalResponse = postHelper(urlResource, paramMap);
//
//            JsonArray jsonobj = JsonParser.parseString(finalResponse).getAsJsonArray();
//
//            if(errorCheck(finalResponse)) {
//                objNode.put(Utils.STATUS, finalResponse);
//            } else {
//                int i;
//                for(i = 0; i < jsonobj.size(); i++) {
//                    ObjectNode tempJson = mapper.createObjectNode();
//                    JsonObject temp = jsonobj.get(i).getAsJsonObject();
//                    JsonObject commitTemp = temp.get("commit").getAsJsonObject();
//                    JsonObject author = commitTemp.get("author").getAsJsonObject();
//                    tempJson.put(Utils.REPO_NAME, author.get(Utils.REPO_NAME).getAsString());
//                    tempJson.put(Utils.DATE, author.get(Utils.DATE).getAsString());
//                    objNode.set(Integer.toString(i), tempJson);
//                }
//                objNode.put(Utils.STATUS, Utils.SUCCESS);
//                objNode.put(Utils.NUM_COMMITS, Integer.toString(i));
//            }
//        } catch (Exception e) {
//            objNode.put(Utils.STATUS, Utils.ERROR + ": " + e.getLocalizedMessage());
//        }
//
//        return objNode;
//    }
//
//
//    private String postHelper(String urlResource, Map<String, String> paramMap) {
//        try {
//            URL url = new URL(urlResource);
//            HttpURLConnection post = (HttpURLConnection)url.openConnection();
//            post.setRequestMethod("POST");
//            post.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
//            post.setRequestProperty("Accept", "application/json");
//            post.setDoOutput(true);
//
//            StringJoiner s = new StringJoiner("&");
//            for(Map.Entry<String, String> temp : paramMap.entrySet()) {
//                s.add(URLEncoder.encode(temp.getKey(), "UTF-8") + "=" + URLEncoder.encode(temp.getValue(), "UTF-8"));
//            }
//
//            byte[] output = s.toString().getBytes(StandardCharsets.UTF_8);
//            post.setFixedLengthStreamingMode(output.length);
//            post.connect();
//
//            try(OutputStream os = post.getOutputStream()) {
//                os.write(output);
//            }
//
//            try(BufferedReader bf = new BufferedReader(new InputStreamReader(post.getInputStream(), "utf-8"))) {
//                StringBuilder response = new StringBuilder();
//                String responseLine = null;
//                while ((responseLine = bf.readLine()) != null) {
//                    response.append(responseLine.trim());
//                }
//                String finalResponse = response.toString();
//                return finalResponse;
//            }
//        } catch (Exception e) {
//            return Utils.ERROR + e.getLocalizedMessage();
//        }
//    }
//
//    private String urlFormatter(String[] elems) {
//        String temp = "";
//        for(String elem : elems) {
//            temp += elem;
//        }
//        return temp;
//    }
//
//    private Boolean errorCheck(String s) {
//        return s.substring(0, 6) == Utils.ERROR;
//    }
//
//    private Map<String, String> parameterMap(String[] keys, String[] values) {
//        Map<String, String> temp = new HashMap<>();
//        for(int i = 0; i < keys.length; i++) {
//            temp.put(keys[i], values[i]);
//        }
//        return temp;
//    }
//}
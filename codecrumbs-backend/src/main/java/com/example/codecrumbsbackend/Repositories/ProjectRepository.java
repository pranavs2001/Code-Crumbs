package com.example.codecrumbsbackend.Repositories;

import com.example.codecrumbsbackend.Models.*;
import com.example.codecrumbsbackend.Secrets.Secrets;
import com.example.codecrumbsbackend.Utils.Utils;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Slf4j
@Repository
public class ProjectRepository {

    @Autowired
    FirebaseService firebaseService;

    public Project postNewProject(Project project) {
        try {
            DocumentReference documentReference = firebaseService.getDb()
                    .collection(Utils.USERS)
                    .document(project.getAssociatedUserId())
                    .collection(Utils.PROJECTS)
                    .document(project.getName());

            long now = Instant.now().toEpochMilli();
            project.setTimeOfCreation(String.valueOf(now));

            Date date = new Date(now);
            DateFormat format = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            format.setTimeZone(TimeZone.getTimeZone("America/Los_Angeles"));
            String formatted = format.format(date);
            project.setTimeOfCreationFormat(formatted);

            project.setNumberOfSearches(0);
            documentReference.set(project, SetOptions.merge());
        }
        catch (NullPointerException e) {
            return new Project();
        }
        return project;
    }

    public Project getProjectByName(ProjectUser projectUser) {
        try {
            DocumentReference documentReference = firebaseService.getDb()
                    .collection(Utils.USERS)
                    .document(projectUser.getUserId())
                    .collection(Utils.PROJECTS)
                    .document(projectUser.getProjectName());

            ApiFuture<DocumentSnapshot> future = documentReference.get();
            DocumentSnapshot document = future.get();

            if (document.exists())
                return document.toObject(Project.class);

        } catch (NullPointerException | InterruptedException | ExecutionException e) {
            return new Project();
        }
        return new Project();
    }

    public Search addNewSearch(Search search) {
        try {
            CollectionReference collectionReference = firebaseService.getDb()
                    .collection(Utils.USERS)
                    .document(search.getAssociatedUserId())
                    .collection(Utils.PROJECTS)
                    .document(search.getAssociatedProjectName())
                    .collection(Utils.SEARCHES);

            long now = Instant.now().toEpochMilli();
            search.setTimeAccessed(String.valueOf(now));

            Date date = new Date(now);
            DateFormat format = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            format.setTimeZone(TimeZone.getTimeZone("America/Los_Angeles"));
            String formatted = format.format(date);
            search.setTimeAccessedFormat(formatted);

            DocumentReference newDoc = collectionReference.document();

            String websiteId = newDoc.getId();
            search.setWebsiteId(websiteId);
            newDoc.set(search, SetOptions.merge());

            //SCREENSHOT THE URL
            String screenshotUrl = takeScreenshot(search.getWebsiteUrl());
            if (screenshotUrl == null)
                throw new NullPointerException();
            //EXTRACT THE TEXT
            String textracted = textract("gs://website-screenshots-hacks/" + screenshotUrl);
            if (textracted == null)
                throw new NullPointerException();

            //FIND BUZZWORDS



            //Increment Number of Searches
            int numOfSearches = getProjectByName(new ProjectUser(search.getAssociatedProjectName(), search.getAssociatedUserId())).getNumberOfSearches();
            DocumentReference documentReference = firebaseService.getDb()
                    .collection(Utils.USERS)
                    .document(search.getAssociatedUserId())
                    .collection(Utils.PROJECTS)
                    .document(search.getAssociatedProjectName());
            documentReference.update(Utils.NUMBER_OF_SEARCHES, numOfSearches + 1);

        }
        catch (NullPointerException | IOException | JSONException e) {
            return new Search();
        }
        return search;
    }

    public List<Search> getMostRecentSearchesLimited(int limit, ProjectUser projectUser) {
        List<Search> toReturn = new ArrayList<>();
        try {
            Query collectionReference = firebaseService.getDb()
                    .collection(Utils.USERS)
                    .document(projectUser.getUserId())
                    .collection(Utils.PROJECTS)
                    .document(projectUser.getProjectName())
                    .collection(Utils.SEARCHES).orderBy(Utils.TIME_ACCESSED, Query.Direction.DESCENDING).limit(limit);

            ApiFuture<QuerySnapshot> collectionFuture = collectionReference.get();
            List<QueryDocumentSnapshot> docs = collectionFuture.get().getDocuments();

            for (QueryDocumentSnapshot snap : docs) {
                toReturn.add(snap.toObject(Search.class));
            }


        } catch (InterruptedException | ExecutionException | NullPointerException e) {
            return new ArrayList<>();
        }
        return toReturn;
    }

    public Search starSearch(Search search) {
        try {
            DocumentReference documentReference = firebaseService.getDb()
                    .collection(Utils.USERS)
                    .document(search.getAssociatedUserId())
                    .collection(Utils.PROJECTS)
                    .document(search.getAssociatedProjectName())
                    .collection(Utils.SEARCHES)
                    .document(search.getWebsiteId());

            documentReference.update(Utils.STARRED, search.isStarred());
        } catch (NullPointerException e) {
            return new Search();
        }
        return search;
    }

    public Search deleteSearch(Search search) {
        ApiFuture<WriteResult> writeResult = firebaseService.getDb()
                .collection(Utils.USERS)
                .document(search.getAssociatedUserId())
                .collection(Utils.PROJECTS)
                .document(search.getAssociatedProjectName())
                .collection(Utils.SEARCHES)
                .document(search.getWebsiteId()).delete();
        return search;
    }

    public Project deleteProject(Project project) {
        ApiFuture<WriteResult> writeResult = firebaseService.getDb()
                .collection(Utils.USERS)
                .document(project.getAssociatedUserId())
                .collection(Utils.PROJECTS)
                .document(project.getName()).delete();
        return project;
    }


    //PRIVATE METHODS FOR TEXT SUMMARIZER
    private String takeScreenshot(String curr_url) throws IOException, JSONException {
        String payload = "{" + "\"url\":" + "\"" + curr_url + "\"" + "}";
        StringEntity entity = new StringEntity(payload,
                ContentType.APPLICATION_JSON);

        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost request = new HttpPost(Utils.SCREENSHOT_URL);
        request.setEntity(entity);

        HttpResponse response = httpClient.execute(request);

        if (response.getStatusLine().getStatusCode() != 200)
            return null;

        BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), "UTF-8"));
        StringBuilder builder = new StringBuilder();
        for (String line = null; (line = reader.readLine()) != null;) {
            builder.append(line).append("\n");
        }

        JSONObject json = new JSONObject(builder.toString());

        return json.getString("screenshotUrl");

    }

    private String textract(String gcsImageUri) throws IOException, JSONException {
        String payload = "{ \"requests\":[{\"image\":{\"source\":{\"gcsImageUri\":\"" + gcsImageUri + "\"}},\"features\":[{\"type\":\"TEXT_DETECTION\",\"maxResults\":10}]}]}";

        StringEntity entity = new StringEntity(payload,
                ContentType.APPLICATION_JSON);

        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost request = new HttpPost(Utils.TEXTRACT_URL + Secrets.TEXTRACT_KEY);
        request.setEntity(entity);

        HttpResponse response = httpClient.execute(request);

        if (response.getStatusLine().getStatusCode() != 200)
            return null;

        BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent(), "UTF-8"));
        StringBuilder builder = new StringBuilder();
        for (String line = null; (line = reader.readLine()) != null;) {
            builder.append(line).append("\n");
        }

        JSONObject json = new JSONObject(builder.toString());

        return json.getJSONArray(Utils.RESPONSES).getJSONObject(0).getJSONArray(Utils.TEXT_ANNOTATIONS).getJSONObject(0).getString(Utils.DESCRIPTION);
    }
}

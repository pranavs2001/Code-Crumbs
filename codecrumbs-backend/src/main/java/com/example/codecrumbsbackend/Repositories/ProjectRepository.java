package com.example.codecrumbsbackend.Repositories;

import com.example.codecrumbsbackend.Models.*;
import com.example.codecrumbsbackend.Utils.Utils;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import lombok.extern.slf4j.Slf4j;
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
            boolean a = takeScreenshot(search.getWebsiteUrl());
            //EXTRACT THE TEXT

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
        catch (NullPointerException | IOException e) {
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
            documentReference.update(Utils.COMMIT_ID, search.getCommitId());
        } catch (NullPointerException e) {
            return new Search();
        }
        return search;
    }


    //PRIVATE METHODS FOR TEXT SUMMARIZER
    private boolean takeScreenshot(String curr_url) throws IOException {
        URL url = new URL(Utils.SCREENSHOT_URL);
        HttpURLConnection con = (HttpURLConnection)url.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json; utf-8");
        con.setRequestProperty("Accept", "application/json");
        con.setDoOutput(true);
        String jsonInputString = "{\"url\": \"" + curr_url + "\" }"; //the issue might be here, the curr_url in itself has some slashes in it, confirm 422 error code by running postman with url without those slashes
        try(OutputStream os = con.getOutputStream()) {
            byte[] input = jsonInputString.getBytes("utf-8");
            os.write(input, 0, input.length);
        }

        String final_response = "";
        try(BufferedReader br = new BufferedReader(
                new InputStreamReader(con.getInputStream(), "utf-8"))) {
            StringBuilder response = new StringBuilder();
            String responseLine = null;
            while ((responseLine = br.readLine()) != null) {
                response.append(responseLine.trim());
            }
            final_response = response.toString();
        }
        return true;
    }
}

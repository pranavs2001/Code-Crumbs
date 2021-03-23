package com.example.codecrumbsbackend.Repositories;

import com.example.codecrumbsbackend.Models.*;
import com.example.codecrumbsbackend.Utils.Utils;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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

            //Increment Number of Searches
            int numOfSearches = getProjectByName(new ProjectUser(search.getAssociatedProjectName(), search.getAssociatedUserId())).getNumberOfSearches();
            DocumentReference documentReference = firebaseService.getDb()
                    .collection(Utils.USERS)
                    .document(search.getAssociatedUserId())
                    .collection(Utils.PROJECTS)
                    .document(search.getAssociatedProjectName());
            documentReference.update(Utils.NUMBER_OF_SEARCHES, numOfSearches + 1);

        }
        catch (NullPointerException e) {
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
}

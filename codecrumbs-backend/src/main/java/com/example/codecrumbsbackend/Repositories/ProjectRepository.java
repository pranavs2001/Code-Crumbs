package com.example.codecrumbsbackend.Repositories;

import com.example.codecrumbsbackend.Models.*;
import com.example.codecrumbsbackend.Utils.Utils;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.SetOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
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
            DocumentReference newDoc = collectionReference.document();

            String websiteId = newDoc.getId();
            search.setWebsiteId(websiteId);
            newDoc.set(search, SetOptions.merge());
        }
        catch (NullPointerException e) {
            return new Search();
        }
        return search;
    }
}

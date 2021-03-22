package com.example.codecrumbsbackend.Repositories;

import com.example.codecrumbsbackend.Models.Project;
import com.example.codecrumbsbackend.Models.User;
import com.example.codecrumbsbackend.Utils.Utils;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.SetOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
                    .document();
            String projectId = documentReference.getId();

            project.setProjectId(projectId);
            documentReference.set(project, SetOptions.merge());
        }
        catch (NullPointerException e) {
            return new Project();
        }
        return project;
    }
}

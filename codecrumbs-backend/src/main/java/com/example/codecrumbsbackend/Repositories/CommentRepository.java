package com.example.codecrumbsbackend.Repositories;

import com.example.codecrumbsbackend.Models.Comment;
import com.example.codecrumbsbackend.Models.ProjectUser;
import com.example.codecrumbsbackend.Models.Search;
import com.example.codecrumbsbackend.Utils.Utils;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.concurrent.ExecutionException;

@Slf4j
@Repository
public class CommentRepository {

    @Autowired
    FirebaseService firebaseService;

    public Comment postNewComment(Comment comment) {
        try {
            DocumentReference documentReference = firebaseService.getDb()
                    .collection(Utils.USERS)
                    .document(comment.getProjectUser().getUserId())
                    .collection(Utils.PROJECTS)
                    .document(comment.getProjectUser().getProjectName())
                    .collection(Utils.SEARCHES)
                    .document(comment.getAssociatedSearchId())
                    .collection(Utils.COMMENTS)
                    .document();

            String documentId = documentReference.getId();
            comment.setCommentId(documentId);

            long now = Instant.now().toEpochMilli();
            comment.setTimeStamp(String.valueOf(now));

            Date date = new Date(now);
            DateFormat format = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            format.setTimeZone(TimeZone.getTimeZone("America/Los_Angeles"));
            String formatted = format.format(date);
            comment.setTimeStampFormat(formatted);

            documentReference.set(comment, SetOptions.merge());
        }
        catch (NullPointerException e) {
            return new Comment();
        }
        return comment;
    }

    public List<Comment> getMostRecentCommentsLimited(int limit, ProjectUser projectUser, String associatedSearchId) {
        List<Comment> toReturn = new ArrayList<>();
        try {
            Query collectionReference = firebaseService.getDb()
                    .collection(Utils.USERS)
                    .document(projectUser.getUserId())
                    .collection(Utils.PROJECTS)
                    .document(projectUser.getProjectName())
                    .collection(Utils.SEARCHES)
                    .document(associatedSearchId)
                    .collection(Utils.COMMENTS)
                    .orderBy(Utils.TIME_ACCESSED, Query.Direction.DESCENDING).limit(limit);

            ApiFuture<QuerySnapshot> collectionFuture = collectionReference.get();
            List<QueryDocumentSnapshot> docs = collectionFuture.get().getDocuments();

            for (QueryDocumentSnapshot snap : docs) {
                toReturn.add(snap.toObject(Comment.class));
            }


        } catch (InterruptedException | ExecutionException | NullPointerException e) {
            return new ArrayList<>();
        }
        return toReturn;
    }

    public Comment deleteComment(Comment comment) {
        ApiFuture<WriteResult> writeResult = firebaseService.getDb()
                .collection(Utils.USERS)
                .document(comment.getProjectUser().getUserId())
                .collection(Utils.PROJECTS)
                .document(comment.getProjectUser().getProjectName())
                .collection(Utils.SEARCHES)
                .document(comment.getAssociatedSearchId())
                .collection(Utils.COMMENTS)
                .document(comment.getCommentId()).delete();
        return comment;
    }
}

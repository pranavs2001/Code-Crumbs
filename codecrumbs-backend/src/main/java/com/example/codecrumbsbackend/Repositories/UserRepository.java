package com.example.codecrumbsbackend.Repositories;

import com.example.codecrumbsbackend.Models.User;
import com.example.codecrumbsbackend.Utils.Utils;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.SetOptions;
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
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import javax.print.Doc;

@Slf4j
@Repository
public class UserRepository {

    @Autowired
    FirebaseService firebaseService;

    public User postNewUser(User user) throws IOException {
        try {
            DocumentReference documentReference = firebaseService.getDb()
                    .collection(Utils.USERS)
                    .document(user.getUserId());

            documentReference.set(user, SetOptions.merge());
        }
        catch (NullPointerException e) {
            return new User();
        }
        return user;

    }

    public User getUserInfo(String userId) {
        try {
            DocumentReference documentReference = firebaseService.getDb()
                    .collection(Utils.USERS)
                    .document(userId);

            ApiFuture<DocumentSnapshot> future = documentReference.get();
            DocumentSnapshot document = future.get();

            if (document.exists())
                return document.toObject(User.class);

        } catch (NullPointerException | InterruptedException | ExecutionException e) {
            return new User();
        }
        return new User();

    }

    public User setUserField(String userId, Map<String, Object> keyValuePairs) {
        try {
            firebaseService.getDb().collection(Utils.USERS).document(userId).update(keyValuePairs);
            return getUserInfo(userId);
        } catch (Exception e) {
            return new User();
        }
    }
}

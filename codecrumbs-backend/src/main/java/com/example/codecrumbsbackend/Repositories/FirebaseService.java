package com.example.codecrumbsbackend.Repositories;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;

@Service
public class FirebaseService {
    private Firestore db;

    @PostConstruct
    public void initialize() {
        try {

//            FileInputStream serviceAccount =
//                    new FileInputStream("src/main/java/com/example/codecrumbsbackend/Repositories/codecrumbs-key.json"); // try to make this relative
//            FirebaseOptions options = new FirebaseOptions.Builder()
//                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                    .setDatabaseUrl("https://codecrumbs.firebaseio.com")
//                    .build();

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(
                            //refreshToken
                            this.getClass().getResourceAsStream("/codecrumbs-key.json")
                    ))
                    .setDatabaseUrl("https://codecrumbs.firebaseio.com")
                    .build();
            FirebaseApp.initializeApp(options);

            db = FirestoreClient.getFirestore();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public Firestore getDb() {
        return db;
    }
}
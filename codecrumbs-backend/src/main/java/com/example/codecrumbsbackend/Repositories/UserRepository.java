package com.example.codecrumbsbackend.Repositories;

import com.example.codecrumbsbackend.Models.User;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.SetOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
public class UserRepository {

    @Autowired
    FirebaseService firebaseService;

    public User postNewUser(User user) {
        try {
            DocumentReference documentReference = firebaseService.getDb()
                    .collection("users")
                    .document(user.getName());

            documentReference.set(user, SetOptions.merge());
        }
        catch (NullPointerException e) {
            return new User();
        }
        return user;
    }
}

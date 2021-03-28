import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//Firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyAxAxnARXfjoB33h2lTUXq_wpD7BNFOkic",
  authDomain: "codecrumbs.firebaseapp.com",
  projectId: "codecrumbs",
  storageBucket: "codecrumbs.appspot.com",
  messagingSenderId: "678789643037",
  appId: "1:678789643037:web:a8ca99ad7761309b4abff4",
  measurementId: "G-VBFKZZRSQ7"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//For Google Sign On

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

//For email/password Sign On

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
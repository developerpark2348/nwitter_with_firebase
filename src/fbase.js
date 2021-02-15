import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCIWZeo04bHk_Bxcn10JuLvdiO-O8rGJMw",
    authDomain: "nwitter-d7011.firebaseapp.com",
    projectId: "nwitter-d7011",
    storageBucket: "nwitter-d7011.appspot.com",
    messagingSenderId: "834338910798",
    appId: "1:834338910798:web:a63c94f5e8ceafc50b491f"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();

export const dbService = firebase.firestore();
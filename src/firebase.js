import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'
// import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA_w1LFD0DpRpNPfuymlfQJYE6SUmkK_K0",
    authDomain: "management-3d15f.firebaseapp.com",
    projectId: "management-3d15f",
    storageBucket: "management-3d15f.appspot.com",
    messagingSenderId: "183399880233",
    appId: "1:183399880233:web:9a82b1d5dfa5de0eea6e38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZYbCDRDt6c3VmtaosdGEmFd1Rnxg9Nus",
  authDomain: "goodquotes-1f058.firebaseapp.com",
  projectId: "goodquotes-1f058",
  storageBucket: "goodquotes-1f058.appspot.com",
  messagingSenderId: "193979584002",
  appId: "1:193979584002:web:2c17afc1ac317d0644a11b",
  measurementId: "G-Y7W9ZLCEB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
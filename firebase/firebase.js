// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzv3tMWdbjnXRxJayv9BdzNYoWKGMLoII",
  authDomain: "varuni-6e0c9.firebaseapp.com",
  projectId: "varuni-6e0c9",
  storageBucket: "varuni-6e0c9.appspot.com",
  messagingSenderId: "994027498569",
  appId: "1:994027498569:web:0b2a021015de889b38e398",
  measurementId: "G-R5RDLKLJ7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
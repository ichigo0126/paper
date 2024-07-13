// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlQIVuvA8BSPcj0mB41_1TzyYYIcGJvw0",
  authDomain: "paper-427816.firebaseapp.com",
  projectId: "paper-427816",
  storageBucket: "paper-427816.appspot.com",
  messagingSenderId: "666039039325",
  appId: "1:666039039325:web:8caf04db30eb33026ba4b4",
  measurementId: "G-EJHXWPHXHV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
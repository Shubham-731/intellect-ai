import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASuGXDyij6h-43nzLxmPqjuk_Xx__0jE8",
  authDomain: "intellectai-ea5ca.firebaseapp.com",
  projectId: "intellectai-ea5ca",
  storageBucket: "intellectai-ea5ca.appspot.com",
  messagingSenderId: "39558076946",
  appId: "1:39558076946:web:e67efe6d3d658a4d2e96cb",
  measurementId: "G-2YPB925LJN",
};

// Init firebase
const app = initializeApp(firebaseConfig);

// Init auth and db
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

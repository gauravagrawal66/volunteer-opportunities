import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBBbwjyqdsy92woczxhLiIiRz5pMXsJLo0",
  authDomain: "volunteer-master-73c99.firebaseapp.com",
  projectId: "volunteer-master-73c99",
  storageBucket: "volunteer-master-73c99.appspot.com",
  messagingSenderId: "789858614200",
  appId: "1:789858614200:web:ec1bc329c455b80f81ed4d",
  measurementId: "G-BGCLRKTEXD"
}; 
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;

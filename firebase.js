// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP0OlBnJCBC6J9l5VR6gkFRezLysxCl7U",
  authDomain: "armarios-dq.firebaseapp.com",
  databaseURL: "https://armarios-dq-default-rtdb.firebaseio.com",
  projectId: "armarios-dq",
  storageBucket: "armarios-dq.appspot.com",
  messagingSenderId: "591660308093",
  appId: "1:591660308093:web:8391ae63cfd5184af28314",
  measurementId: "G-MN9B3BBZ27",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

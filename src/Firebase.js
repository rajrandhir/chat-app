
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDBXNZ7iIP30M_84ttA9sT3qJwn2X-YFrs",
  authDomain: "chat-app-55314.firebaseapp.com",
  projectId: "chat-app-55314",
  storageBucket: "chat-app-55314.appspot.com",
  messagingSenderId: "16599883153",
  appId: "1:16599883153:web:06a65eb2a5b64960a60e30",
  measurementId: "G-BMV6HB36H6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-2-d8364.firebaseapp.com",
  projectId: "mern-blog-app-2-d8364",
  storageBucket: "mern-blog-app-2-d8364.appspot.com",
  messagingSenderId: "575078196946",
  appId: "1:575078196946:web:41e1cbc75741d226a2af0b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

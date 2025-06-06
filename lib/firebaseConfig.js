// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCECwFEMSAVII9RlvjUjY8AkEK5DN86blQ",
  authDomain: "revio-899ad.firebaseapp.com",
  projectId: "revio-899ad",
  storageBucket: "revio-899ad.firebasestorage.app",
  messagingSenderId: "1012006786653",
  appId: "1:1012006786653:web:b485d0dbbf5ed6e0e25fb4"
};

const app = initializeApp(firebaseConfig);

// ✅ Use AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
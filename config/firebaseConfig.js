import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAhRcprzToDSDBNQWC3gyxbYcRFHKQlps",
  authDomain: "netflix-57d10.firebaseapp.com",
  projectId: "netflix-57d10",
  storageBucket: "netflix-57d10.firebasestorage.app",
  messagingSenderId: "401943775872",
  appId: "1:401943775872:web:ba95ee784417edf411b465",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);
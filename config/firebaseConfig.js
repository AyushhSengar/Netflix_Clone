// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAhRcprzToDSDBNQWC3gyxbYcRFHKQlps",
    authDomain: "netflix-57d10.firebaseapp.com",
    projectId: "netflix-57d10",
    storageBucket: "netflix-57d10.firebasestorage.app",
    messagingSenderId: "401943775872",
    appId: "1:401943775872:web:ba95ee784417edf411b465",
    measurementId: "G-3TV694GC2L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
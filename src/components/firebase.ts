// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAn3QkrGRtfQTMlmhr5ojDkr7SHsB5bY0",
  authDomain: "arduino-led-ed555.firebaseapp.com",
  databaseURL:
    "https://arduino-led-ed555-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "arduino-led-ed555",
  storageBucket: "arduino-led-ed555.firebasestorage.app",
  messagingSenderId: "166075128865",
  appId: "1:166075128865:web:ddb87fd103f5142f059760",
  measurementId: "G-DXFSBS7MMR",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getDatabase();

export default db;

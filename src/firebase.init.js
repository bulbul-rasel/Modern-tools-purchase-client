// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYWbusDYNg-nImOyYmKHvIv0KZHX7hgVU",
    authDomain: "modern-tools.firebaseapp.com",
    projectId: "modern-tools",
    storageBucket: "modern-tools.appspot.com",
    messagingSenderId: "523906831890",
    appId: "1:523906831890:web:ea9c857224dd667d54aacb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
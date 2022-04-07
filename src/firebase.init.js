// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsBRvdzQMfISqsBYOIBwmvF91kT8O3LEU",
    authDomain: "email-password-auth-d6516.firebaseapp.com",
    projectId: "email-password-auth-d6516",
    storageBucket: "email-password-auth-d6516.appspot.com",
    messagingSenderId: "444384213844",
    appId: "1:444384213844:web:4b7c0e4698ed3bbc95a6c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
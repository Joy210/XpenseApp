// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzcNEIoncXAAnnBoiD787enlAgzACBZn0",
  authDomain: "expense-9a03f.firebaseapp.com",
  projectId: "expense-9a03f",
  storageBucket: "expense-9a03f.appspot.com",
  messagingSenderId: "258771076787",
  appId: "1:258771076787:web:141d74b663aaa1637492c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(); 
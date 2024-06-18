// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import { signInWithEmailAndPassword } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjL4a1sYF-VNKYoF04pJiVZOu9WHyscjA",
  authDomain: "login-and-signup-3ce37.firebaseapp.com",
  projectId: "login-and-signup-3ce37",
  storageBucket: "login-and-signup-3ce37.appspot.com",
  messagingSenderId: "488179273810",
  appId: "1:488179273810:web:cfca3ea3295b131e100f8b"
};




const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
export {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword}
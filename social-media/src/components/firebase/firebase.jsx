import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged ,signInWithEmailAndPassword,createUserWithEmailAndPassword  } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCZv1UiQLJTKKHcDpTO468D9CamoKShQWs",
  authDomain: "social-media-f4307.firebaseapp.com",
  projectId: "social-media-f4307",
  storageBucket: "social-media-f4307.appspot.com",
  messagingSenderId: "341277536601",
  appId: "1:341277536601:web:72b12b79606464c42cdc48"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword  };
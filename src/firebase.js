//import firebase from "firebase"
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAx-xUdYz3LqUvFf6KqGvWs9HryKhk7y3I",
  authDomain: "whatsapp-skorall.firebaseapp.com",
  projectId: "whatsapp-skorall",
  storageBucket: "whatsapp-skorall.firebasestorage.app",
  messagingSenderId: "833187823530",
  appId: "1:833187823530:web:fa6a8fdb95bc5efc18f5d3",
  measurementId: "G-FSE3DHL182"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider, storage, signInWithPopup };
export default db;
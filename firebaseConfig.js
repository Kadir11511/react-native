import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCG-MBxQ5NmQWhdOpeKLcTjDQefTnuq3KE",
  authDomain: "otonom-arac-kiralama.firebaseapp.com",
  projectId: "otonom-arac-kiralama",
  storageBucket: "otonom-arac-kiralama.firebasestorage.com",
  messagingSenderId: "111279779711",
  appId: "1:111279779711:web:fa14244b75a927f2a3b44a",
  measurementId: "G-V0FCCWG1LV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // firebase 설정과 관련된 개인 정보
  apiKey: "AIzaSyBojnoyVEz00Sm0QJkVI1rWt4Eu3vHqeZ0",
  authDomain: "randomly-47cc7.firebaseapp.com",
  projectId: "randomly-47cc7",
  storageBucket: "randomly-47cc7.appspot.com",
  messagingSenderId: "35200219216",
  appId: "35200219216:web:6b2ac401297b6ac03af955",
  measurementId: "G-MKNJQNEF4Y",
};

const firebase = initializeApp(firebaseConfig);

const fireStore = getFirestore(firebase);
console.log(fireStore);

export { fireStore };

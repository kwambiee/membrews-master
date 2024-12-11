// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlnqkM9C_xBeOMQenNNUrYCknkqYWD1-I",
  authDomain: "members-50edd.firebaseapp.com",
  projectId: "members-50edd",
  storageBucket: "members-50edd.firebasestorage.app",
  messagingSenderId: "1059999244098",
  appId: "1:1059999244098:web:990ea2a6a6e8cf0a36f2db",
  measurementId: "G-SXCG7Z7PEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
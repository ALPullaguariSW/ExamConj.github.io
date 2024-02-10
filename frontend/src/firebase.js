// Importa las funciones que necesitas de los SDK que necesitas
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB6jMNmURDRVCsFHFv7JC2tOWIT0Z1SIn8",
  authDomain: "autenticador-8fd98.firebaseapp.com",
  databaseURL: "https://autenticador-8fd98-default-rtdb.firebaseio.com",
  projectId: "autenticador-8fd98",
  storageBucket: "autenticador-8fd98.appspot.com",
  messagingSenderId: "599275193091",
  appId: "1:599275193091:web:21d71db638c5fb8539df36",
};
// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };

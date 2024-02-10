// Importa las funciones que necesitas de los SDK que necesitas
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "**************************",
  authDomain: "**************************",
  databaseURL: "**************************",
  projectId: "**************************",
  storageBucket: "**************************",
  messagingSenderId: "**************************",
  appId: "****************************************************",
};
// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };

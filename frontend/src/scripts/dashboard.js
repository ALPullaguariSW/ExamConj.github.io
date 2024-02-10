// dashboard.js

import { push, ref, get } from "firebase/database";
import { database } from "../firebase";

// Función para obtener todas las órdenes
export const getAllOrders = async () => {
  try {
    const snapshot = await get(ref(database, "orders"));
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  } catch (error) {
    console.error("Error getting orders:", error);
    return [];
  }
};

// Función para agregar una nueva orden
export const addOrder = async (orderData) => {
  try {
    const newOrderRef = push(ref(database, "orders"), orderData);
    return newOrderRef.key;
  } catch (error) {
    console.error("Error adding order:", error);
    return null;
  }
};

// Otras funciones para actualizar, eliminar, etc.

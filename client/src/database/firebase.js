import { initializeApp } from "firebase/app";
import "firebase/firestore";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  deleteDoc,
  doc,
  where,
  getDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDb6_cvgO0yiNr7LznDjjz3MoD71sIX870",
  authDomain: "sbsticket.firebaseapp.com",
  projectId: "sbsticket",
  storageBucket: "sbsticket.appspot.com",
  messagingSenderId: "598909285517",
  appId: "1:598909285517:web:1cd90c64d6b178c5c59ec4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const handleStoreGuest = async ({
  name,
  lastName,
  dni,
  email,
  tickets,
  date,
  twone,
  ticketValue,
  ticketType,
}) => {
  const clientsCollection = collection(db, "guests");

  const clientData = {
    name,
    lastName,
    dni,
    email,
    tickets,
    date,
    twone,
    ticketValue,
    ticketType,
  };

  try {
    const docRef = await addDoc(clientsCollection, clientData);
    console.log("Cliente almacenado con ID: ", docRef.id);
  } catch (error) {
    console.error("Error al almacenar el cliente: ", error);
  }
};

export async function getEvent() {
  try {
    const eventRef = doc(db, "events", "main-event");

    const eventSnapshot = await getDoc(eventRef);

    if (eventSnapshot.exists()) {
      const eventData = eventSnapshot.data();
      return eventData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el evento: ", error);
    throw error;
  }
}

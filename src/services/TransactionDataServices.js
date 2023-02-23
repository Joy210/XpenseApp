import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const collectionName = 'transactions';
const collectionRef = collection(db, collectionName);

class TransactionDataServices {
  addTransaction = (newData) => {
    return addDoc(collectionRef, newData);
  };

  updateTransaction = (id, updatedData) => {
    const dataDoc = doc(db, collectionName, id);
    return updateDoc(dataDoc, updatedData);
  };

  deleteTransaction = (id) => {
    const dataDoc = doc(db, collectionName, id);
    return deleteDoc(dataDoc);
  };

  getAllTransactions = () => {
    return getDocs(collectionRef);
  };

  getTransaction = (id) => {
    const dataDoc = doc(db, collectionName, id);
    return getDoc(dataDoc);
  };
}

export default new TransactionDataServices();

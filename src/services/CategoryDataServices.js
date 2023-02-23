import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const collectionName = 'categories';
const collectionRef = collection(db, collectionName);

class CategoryDataServices {
  addCategories = (newData) => {
    return addDoc(collectionRef, newData);
  };

  updateCategory = (id, updatedData) => {
    const dataDoc = doc(db, collectionName, id);
    return updateDoc(dataDoc, updatedData);
  };

  deleteCategory = (id) => {
    const dataDoc = doc(db, collectionName, id);
    return deleteDoc(dataDoc);
  };

  getAllCategories = () => {
    return getDocs(collectionRef);
  };

  getCategory = (id) => {
    const dataDoc = doc(db, collectionName, id);
    return getDoc(dataDoc);
  };
}

export default new CategoryDataServices();

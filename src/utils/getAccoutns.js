import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

// fetched data from database
export const fetchData = async (collectionName) => {
  const list = [];

  try {
    const querySnap = await getDocs(collection(db, collectionName));
    querySnap.forEach((res) => {
      list.push(res.data());
    });

    if (list.length !== 0) {
      // setAccounts(list);
      return list;
    } else {
      console.log("No data found!");
    }
  } catch (error) {
    console.log(error);
  }
};
/* eslint-disable no-unused-vars */
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";

// import AccountDataService from "../services/account.services";

export const AccountList = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = async () => {
    const list = [];

    try {
      const querySnap = await getDocs(collection(db, "accounts"));
      querySnap.forEach((res) => {
        list.push(res.data());
      });

      if (list.length !== 0) {
        setCities(list);
      } else {
        console.log("No data found!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await addDoc(collection(db, "accounts"), {
      id: Date.now(),
      name: "scb bank 1",
      amount: 12000,
      timeStamp: serverTimestamp(),
    });

    console.log("Data Submited", data);
  };

  const getTotalAmount = () => {
    const res = cities.reduce((a, v) => (a = a + v.amount), 0);

    return res;
  };

  // console.log(test);

  return (
    <div>
      <span>Account Lists</span>
      <hr />

      <table className="table table-bordered">
        <thead>
          <tr className="bg-warning">
            <th>Total Amount</th>
            <th>
              {cities
                ? cities.reduce(
                    (total, currentValue) => (total += currentValue.amount),
                    0
                  )
                : "No Data Found!"}
            </th>
          </tr>
        </thead>
      </table>

      <table className="table table-bordered table-striped">
        <thead>
          <tr className="bg-secondary text-white">
            <th>Bank Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {cities &&
            cities.map((data, i) => {
              return (
                <>
                  <tr key={i}>
                    <td>{data.name}</td>
                    <td>{data.amount}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>

      <form onSubmit={handleSubmit}>
        <button className="btn btn-primary mt-5" type="submit">
          Save Data
        </button>
      </form>
    </div>
  );
};

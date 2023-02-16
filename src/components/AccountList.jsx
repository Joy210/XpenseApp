/* eslint-disable no-unused-vars */
import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import AddAccounts from "./AddAccounts";
import AddCategory from "./AddCategory";
import AddTransaction from "./AddTransaction";

// import AccountDataService from "../services/account.services";

export const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAccounts();
    getCategory();
    getTransactions();
  }, []);

  // fetched Account List from database
  const getAccounts = async () => {
    const list = [];

    try {
      const querySnap = await getDocs(collection(db, "accounts"));
      querySnap.forEach((res) => {
        list.push(res.data());
      });

      if (list.length !== 0) {
        setAccounts(list);
      } else {
        console.log("No data found!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetched Transaction List from database
  const getTransactions = async () => {
    const list = [];

    try {
      const querySnap = await getDocs(collection(db, "transactions"));
      querySnap.forEach((res) => {
        list.push(res.data());
      });

      if (list.length !== 0) {
        setTransactions(list);
      } else {
        console.log("No data found!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fetched Category List from database
  const getCategory = async () => {
    const list = [];

    try {
      const querySnap = await getDocs(collection(db, "categories"));
      querySnap.forEach((res) => {
        list.push(res.data());
      });

      if (list.length !== 0) {
        setCategories(list);
      } else {
        console.log("No data found!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalAmount = () => {
    const res = accounts.reduce((a, v) => (a = a + v.amount), 0);

    console.log(res);
    // return res;
  };

  return (
    <div className="py-5">
      <h4>Account Lists</h4>

      <table className="table table-bordered table-striped">
        <thead>
          <tr className="bg-secondary text-white">
            <th>Bank Name</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {accounts &&
            accounts.map((data, i) => {
              return (
                <tr key={i}>
                  <td className="text-uppercase">{data.name}</td>
                  <td>{data.amount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="row mt-3">
        <div className="col col-sm-12">
          <AddTransaction
            accounts={accounts}
            categories={categories}
            transactions={transactions}
          />
        </div>
        <div className="col col-sm-12">
          <AddCategory />
          <br />
          <AddAccounts />
        </div>
      </div>
    </div>
  );
};

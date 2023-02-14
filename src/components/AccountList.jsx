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

  useEffect(() => {
    getAccounts();
    getCategory();
  }, []);

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
    const res = accounts.reduce((a, v) => (a = a + v.amount), 0);

    console.log(res);
    // return res;
  };

  // console.log(test);

  const [category, setCategory] = useState([]);
  const [inputValue, setInputValue] = useState();
  let selctedOptionId = 0;

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setInputValue({ [name]: value });
  };

  let selectHandler = (e) => {
    setCategory(e.target.value);
  };

  const addCategoryHandler = async (e) => {
    e.preventDefault();

    // setCategory({ name: inputValue });

    // const data = await addDoc(collection(db, "categories"), {
    //   id: Date.now(),
    //   name: inputValue,
    //   timeStamp: serverTimestamp(),
    // });

    console.log(inputValue);
  };

  return (
    <div>
      <span>Account Lists</span>
      <hr />
      <div className="row">
        <div className="col">
          <table className="table table-bordered">
            <thead>
              <tr className="bg-warning">
                <th>Total Amount</th>
                <th>
                  {accounts
                    ? accounts.reduce(
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
        </div>
        <div className="col">
          <AddAccounts />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <AddTransaction accounts={accounts} categories={categories} />
        </div>
        <div className="col">
          <AddCategory />
        </div>
      </div>

      {/* <form onSubmit={handleSubmit}>
        <button className="btn btn-primary mt-5" type="submit">
          Save Data
        </button>
      </form> */}
    </div>
  );
};

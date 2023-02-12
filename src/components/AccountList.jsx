import React, { useEffect } from "react";
import { db } from "../firebase-config";
import AccountDataService from "../services/account.services";

export const AccountList = () => {
  useEffect(() => {
    getAccounts();
  }, []);

  const getAccounts = () => {
    // const data = await AccountDataService;
    // console.log(data);

    db.collection("data")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          var data = element.data();
          console.log(data);
        });
      });
  };

  return (
    <div>
      <h1>Account Lists</h1>
    </div>
  );
};

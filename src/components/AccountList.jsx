/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AaccountDataServices from "../services/AaccountDataServices";
import TransactionDataServices from "../services/TransactionDataServices";

// import AccountDataService from "../services/account.services";

export const AccountList = (props) => {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getAccounts();
    getTransactions();
  }, []);

  const getAccounts = async () => {
    const data = await AaccountDataServices.getAllAccounts();
    setAccounts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  }

  const getTransactions = async () => {
    const data = await TransactionDataServices.getAllTransactions();
    setTransactions(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  }

  // const getTotalAmount = () => {
  //   const res = accounts.reduce((a, v) => (a += v.amount), 0);
  //   console.log(res);
  //   // return res;
  // };

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

      <br />

      <h4>Transaction Lists</h4>
      <table className="table table-bordered table-striped">
        <thead>
          <tr className="bg-secondary text-white">
            <th>From</th>
            <th>To</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions &&
            transactions.map((data, i) => {
              return (
                <tr key={i}>
                  <td className="text-uppercase">{data.fromAcc}</td>
                  <td className="text-uppercase">{data.selectOption}</td>
                  <td className="text-uppercase">
                    <span className={`badge text-bg-${data.trnxType === "EXPENSE" ? 'primary' : 'warning'}`}>
                      {data.trnxType}
                    </span>
                  </td>
                  <td>{data.amount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>


      {/* <div className="row mt-3">
        <div className="col-lg-6 col-sm-12">
          <AddTransaction
            accounts={accounts}
            categories={categories}
            transactions={transactions}
          />
          <br />
        </div>
        <div className="col-lg-6 col-sm-12">
          <AddCategory />
          <br />
          <AddAccounts />
        </div>
      </div> */}
    </div>
  );
};

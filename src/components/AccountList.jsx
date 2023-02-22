/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/fetchData";

// import AccountDataService from "../services/account.services";

export const AccountList = (props) => {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData('accounts').then(data => setAccounts(data));
    fetchData('categories').then(data => setCategories(data));
    fetchData('transactions').then(data => setTransactions(data));

    test()
  }, []);


  const getTotalAmount = () => {
    const res = accounts.reduce((a, v) => (a += v.amount), 0);

    console.log(res);
    // return res;
  };

  const test = () => {

    // accounts.map(bank => {
    //   let currAmount = 0;
      
    //   transactions.map(item => {
    //     let listOfAmount = [];
        
    //     if (bank.value === item.fromAcc && item.trnxType === "EXPENSE") {
    //       currAmount = bank.amount - item.amount;

    //       console.log(bank.name, currAmount);
    //       console.log(item.trnxType);

    //       return currAmount;
    //     } else {
    //       // console.log("Else: ",bank.name, item.from)
    //       // console.log(item.trnxType);;
    //     }

    //   })

    //   return bank.amount
    // });

    transactions.filter(item => {
      let list = [];

      if (item.trnxType === 'EXPENSE') {
        list.push(item);

        accounts.map(bank => {
          let crrAmt;

          if (bank.value === item.fromAcc) {
            crrAmt = bank.amount - item.amount;
            console.log(bank.name, crrAmt);
          }

          // return crrAmt;
        });
        
        // console.log(item.fromAcc);;
      } else {
        list.push(item);
      }
      

      // console.log(list);

      return list;
    })
    
  }

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
                  <td className="text-uppercase">{data.trnxType}</td>
                  <td>{data.amount}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <br />

      <h4>Category Lists</h4>
      <table className="table table-bordered table-striped">
        <thead>
          <tr className="bg-secondary text-white">
            <th>Category Name</th>

          </tr>
        </thead>

        <tbody>
          {categories &&
            categories.map((data, i) => {
              return (
                <tr key={i}>
                  <td className="text-uppercase">{data.name}</td>

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

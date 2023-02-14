import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase-config";

const AddTransaction = ({ accounts, categories, transactions }) => {
  const [values, setValues] = useState({
    transactionType: "EXPENSE",
    amount: 0,
    note: "",
    option1: "",
    option2: "",
    option3: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const onRadioChange = (e) => {
    setValues({
      ...values,
      transactionType: e.currentTarget.value,
    });
  };
  // console.log(values);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let obj = {};
    const { transactionType, amount, note, option1, option2, option3 } = values;

    if (transactionType === "EXPENSE") {
      obj = {
        id: Date.now(),
        transactionType,
        note,
        option1,
        option2,
        amount: parseInt(amount),
        timeStamp: serverTimestamp(),
      };
    } else {
      obj = {
        id: Date.now(),
        transactionType,
        note,
        option1,
        option3,
        amount: parseInt(amount),
        timeStamp: serverTimestamp(),
      };
    }

    if (
      transactionType !== "" &&
      amount !== "" &&
      note !== "" &&
      option1 !== "" &&
      option2 !== ""
    ) {
      // save data into firebase
      // const data = await addDoc(collection(db, "transactions"), obj);

      console.log("Transaction Saved Successfully");
    } else {
      console.log("Empty");
    }

    console.log("Data: ", obj);
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">Add Transaction</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="transacType"
                    id="expense"
                    value="EXPENSE"
                    onChange={onRadioChange}
                    checked={values.transactionType === "EXPENSE"}
                  />
                  <label className="form-check-label" htmlFor="expense">
                    Expense
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="transacType"
                    id="transfer"
                    value="TRANSFER"
                    onChange={onRadioChange}
                    checked={values.transactionType === "TRANSFER"}
                  />
                  <label className="form-check-label" htmlFor="transfer">
                    Transfer
                  </label>
                </div>

                <hr />

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="amount"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Note
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="note"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    {values.transactionType === "EXPENSE"
                      ? "Bank Accounts"
                      : "From Account"}
                  </label>

                  <select
                    className="form-select text-capitalize mb-3"
                    name="option1"
                    onChange={handleInputChange}
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Select
                    </option>

                    {accounts &&
                      accounts.map((data, i) => {
                        return (
                          <option value={data.value} key={i}>
                            {data.name}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Test
                  </label>

                  <select
                    className="form-select text-capitalize mb-3"
                    name="option3"
                    onChange={handleInputChange}
                    defaultValue={"DEFAULT"}
                  >
                    <option value="DEFAULT" disabled>
                      Select
                    </option>

                    {accounts &&
                      accounts.map((data, i) => {
                        return (
                          <option value={data.value} key={i}>
                            {data.name}
                          </option>
                        );
                      })}
                  </select>
                </div>

                {/* {values.transactionType === "EXPENSE" && (
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Category
                    </label>

                    <select
                      className="form-select text-capitalize mb-3"
                      name="option2"
                      onChange={handleInputChange}
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT" disabled>
                        Select
                      </option>

                      {categories &&
                        categories.map((data, i) => {
                          return (
                            <option value={data.value} key={i}>
                              {data.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                )} */}

                {/* {values.transactionType === "TRANSFER" && (
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      To Account
                    </label>

                    <select
                      className="form-select text-capitalize mb-3"
                      name="optioin3"
                      onChange={handleInputChange}
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT" disabled>
                        Select
                      </option>

                      {accounts &&
                        accounts.map((data, i) => {
                          return (
                            <option value={data.value} key={i}>
                              {data.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                )} */}

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;

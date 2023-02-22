import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { fetchData } from "../utils/getAccoutns";

const AddTransaction = () => {
  let history = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [inputValues, setInputValues] = useState({
    trnxType: "EXPENSE",
    amount: "",
    note: "",
    fromAcc: "",
    selectOption: "",
  });


  useEffect(() => {
    fetchData('accounts').then(data => setAccounts(data));
    fetchData('categories').then(data => setCategories(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  // console.log(inputValues);

  const onRadioChange = (e) => {
    setInputValues({
      [e.target.name]: e.currentTarget.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { trnxType, amount, note, fromAcc, selectOption } = inputValues;

    let obj = {
      id: Date.now(),
      trnxType,
      amount: parseInt(amount),
      note,
      fromAcc,
      selectOption,
      timeStamp: serverTimestamp(),
    };

    if (
      trnxType !== "" &&
      amount !== "" &&
      note !== "" &&
      fromAcc !== "" &&
      selectOption !== ""
    ) {
      // save data into firebase
      const data = await addDoc(collection(db, "transactions"), obj);

      console.log("Transaction Saved Successfully", data);
    } else {
      console.log("Empty");
    }

    e.target.reset();
    history('/');

    // console.log("Data: ", obj);
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
                    name="trnxType"
                    id="expense"
                    value="EXPENSE"
                    onChange={onRadioChange}
                    checked={inputValues.trnxType === "EXPENSE"}
                  />
                  <label className="form-check-label" htmlFor="expense">
                    Expense
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="trnxType"
                    id="transfer"
                    value="TRANSFER"
                    onChange={onRadioChange}
                    checked={inputValues.trnxType === "TRANSFER"}
                  />
                  <label className="form-check-label" htmlFor="transfer">
                    Transfer
                  </label>
                </div>

                <hr />

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    {inputValues.transactionType === "EXPENSE"
                      ? "Bank Accounts"
                      : "From Account"}
                  </label>

                  <select
                    className="form-select text-capitalize mb-3"
                    name="fromAcc"
                    id="fromAcc"
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

                {inputValues.trnxType === "EXPENSE" && (
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Category
                    </label>

                    <select
                      className="form-select text-capitalize mb-3"
                      name="selectOption"
                      id="selectOption"
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
                )}

                {inputValues.trnxType === "TRANSFER" && (
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      To Account
                    </label>

                    <select
                      className="form-select text-capitalize mb-3"
                      name="selectOption"
                      id="selectOption"
                      onChange={handleInputChange}
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT" disabled>
                        Select
                      </option>

                      {accounts &&
                        accounts.map((data, i) => {
                          return (
                            <option
                              value={data.value}
                              key={i}
                              hidden={inputValues.fromAcc === data.value}
                            >
                              {data.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Amount
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      name="amount"
                      onChange={handleInputChange}
                      // value={inputValues.amount}
                    />
                    <span className="input-group-text bg-white text-muted fw-bold">
                      BDT
                    </span>
                  </div>
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
                    // value={inputValues.note}
                  />
                </div>

                

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

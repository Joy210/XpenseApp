import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase-config";

const AddAccounts = () => {
  const [values, setValues] = useState({
    bankName: "",
    bankAmount: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      id: Date.now(),
      name: values.bankName,
      amount: parseInt(values.bankAmount),
      timeStamp: serverTimestamp(),
    };

    if (values.bankName !== "" && values.bankAmount !== "") {
      // save data into firebase
      const data = await addDoc(collection(db, "accounts"), obj);

      console.log("Account Saved Successfully");
    } else {
      console.log("Empty");
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">Add Bank Accounts</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="bankName"
                    onChange={handleInputChange}
                    // value={values.bankName}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="bankAmount"
                    onChange={handleInputChange}
                    // value={values.bankAmount}
                  />
                </div>

                <button type="submit" className="btn btn-warning">
                  Save Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccounts;

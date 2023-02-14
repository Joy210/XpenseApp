import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase-config";

const AddCategory = () => {
  const [values, setValues] = useState({
    name: "",
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
      name: values.name,
      timeStamp: serverTimestamp(),
    };

    if (values.name !== "") {
      // save data into firebase
      const data = await addDoc(collection(db, "categories"), obj);

      console.log("Category Saved Successfully");
    } else {
      console.log("Empty");
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header">Add Category</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleInputChange}
                    // value={values.bankName}
                  />
                </div>

                <button type="submit" className="btn btn-warning">
                  Save Category
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;

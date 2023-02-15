import { Route, Routes } from "react-router-dom";

import AddAccounts from "./components/AddAccounts";
import AddCategory from "./components/AddCategory";
import AddTransaction from "./components/AddTransaction";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add_account" element={<AddAccounts />}></Route>
        <Route path="/add_transaction" element={<AddTransaction />}></Route>
        <Route path="/add_category" element={<AddCategory />}></Route>
      </Routes>
    </>
  );
};

export default App;

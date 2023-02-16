import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to={"/"}>
            Expense Tracker
          </Link>
          <div className="">
            <ul className="navbar-nav flex-row gap-4">
              <li className="nav-item">
                <Link to={"/"} className="nav-link active">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/add_account"} className="nav-link ">
                  Add Account
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/add_transaction"} className="nav-link ">
                  Add Transaction
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/add_category"} className="nav-link ">
                  Add Category
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

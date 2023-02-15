import React from "react";
import { AccountList } from "./AccountList";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <>
      <div className="main-wrapper">
        <div className="container">
          <AccountList />
        </div>
      </div>
    </>
  );
};

export default Home;

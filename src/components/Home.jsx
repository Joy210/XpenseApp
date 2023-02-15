import React from "react";
import { AccountList } from "./AccountList";

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

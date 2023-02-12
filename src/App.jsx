import { AccountList } from "./components/AccountList";

const App = () => {
  return (
    <>
      <div className="main-container p-5">
        <div className="container">
          <h1>Home</h1>

          <AccountList />
        </div>
      </div>
    </>
  );
};

export default App;

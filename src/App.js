import "./App.css";
import Table from "./components/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Login from "./components/Login";

const credentials = { username: "sagar121", password: "Sagar9695" };

function App() {
  const [formValue, setFormValue] = useState({ username: "", password: "" });
  const [showTable, setShowTable] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (!formValue.username && !formValue.password) {
      return;
    }

    if (
      formValue.username === credentials.username &&
      formValue.password === credentials.password
    ) {
      setShowTable(true);
      setShowLogin(false);
    } else {
      alert("Sorry! Username and password doesn't match.");
    }
  }, [formValue]);

  return (
    <div className="App">
      {showLogin && <Login setFormValue={setFormValue} />}
      {showTable && <Table />}
    </div>
  );
}

export default App;

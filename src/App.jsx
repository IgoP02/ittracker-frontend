import { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Components/Home";
import Reports from "./Components/Admin/TrackerDashboard";
import ReportsLayout from "./Components/Admin/AdminLayout";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <NavBar />
      </div>
    </>
  );
}

export default App;

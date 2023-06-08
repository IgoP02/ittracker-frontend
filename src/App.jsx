import { useState, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";

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

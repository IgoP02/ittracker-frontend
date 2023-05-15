import React, { createContext, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "semantic-ui-css/semantic.min.css";
import Home from "./Components/Home";
import GlobalLayout from "./Components/GlobalLayout";
import AdminLayout from "./Components/admin/AdminLayout";
import CreateReport from "./Components/reports/CreateReport";
import Dashboard from "./Components/admin/Dashboard";
import ProtectedRoute from "./Components/utils/ProtectedRoute";
import TestComponent from "./Components/TestComponent";
import "./assets/App.css";
import Tracker from "./Components/admin/Tracker";
import { isLogged } from "./Components/utils/manageLogin";
import SuccessPage from "./Components/reports/SuccessPage";
export const LoginContext = createContext();
function Main() {
  const [loggedIn, setLoggedIn] = useState(isLogged());
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<GlobalLayout />}>
        <Route path="Testing" element={<TestComponent />} />
        <Route index element={<Home />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={loggedIn}>
              <AdminLayout />
            </ProtectedRoute>
          }>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tracker" element={<Tracker />} />
        </Route>
        <Route path="reports">
          <Route path="create" element={<CreateReport />} />
          <Route path="get/:id" element={<SuccessPage />} />
          <Route path="success/:id" element={<SuccessPage />} />
        </Route>
      </Route>
    )
  );
  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <RouterProvider router={route} />
    </LoginContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

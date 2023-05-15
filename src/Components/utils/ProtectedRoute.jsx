import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../main";

export default function ProtectedRoute({ children }) {
  const [loggedIn] = useContext(LoginContext);
  const navigate = useNavigate();
  if (!loggedIn) {
    navigate("/");
  }
  return children;
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ loggedIn, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, []);
  return children;

  /* if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children; */
}

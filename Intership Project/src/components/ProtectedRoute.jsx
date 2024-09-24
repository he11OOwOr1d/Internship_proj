import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(localStorage.getItem('authToken'))

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin"); // Redirect to login page if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null; // Render the children if authenticated
};

export default ProtectedRoute;

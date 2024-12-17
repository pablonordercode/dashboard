import {Navigate } from "react-router-dom";
import adminAuth from "./adminAuth";

function PrivateRoute({ children }) {
    const seEstaAutenticado = adminAuth(); 
    return seEstaAutenticado ? children : <Navigate to="/" />;
  }

  export default PrivateRoute;
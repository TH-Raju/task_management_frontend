/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
// import jwt_decode from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const cookie = new Cookies();
  const userEmail = cookie?.get("email");
  const location = useLocation();
  let accessToken = localStorage.getItem("accessToken");
  accessToken = accessToken.replace("bearer ", "");
  //   console.log("acc", accessToken);

  const decodedToken = jwtDecode(accessToken);
  //   console.log(userEmail);
  //   console.log(decodedToken);
  if (userEmail == decodedToken.email) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;

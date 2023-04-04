// import OktaAuth from "@okta/okta-auth-js";
import { Outlet } from "react-router";
import Home from "./Home";
// import { useNavigate } from "react-router-dom";
// import Login from "./Login";

// import Login from "./Login";

const useAuth = () => {
  //   const navigate = useNavigate();
  const user = { loggedIn: true };
  console.log("..user:", user, "user state...:", user.loggedIn);
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();

  return isAuth ? <Outlet /> : <Home />;
  // return isAuth ? <Outlet /> : <navigate to="Home" />;
  //   return isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;

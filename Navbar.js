import { useOktaAuth } from "@okta/okta-react";
import React from "react";
import { Link } from "react-router-dom";
// import { useNavigate, Link } from "react-router-dom";
import { Container, Image, Menu } from "semantic-ui-react";
import logo from "./logo.svg";

const Navbar = ({ setCorsErrorModalOpen }) => {
  // const history = useNavigate();
  const { authState, oktaAuth } = useOktaAuth();

  // Note: Can't distinguish CORS error from other network errors
  const isCorsError = (err) =>
    err.name === "AuthApiError" &&
    !err.errorCode &&
    err.xhr.message === "Failed to fetch";

  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut("/");

  /*  const login = async () => oktaAuth.signInWithRedirect();

  const logout = async () => {
    // const basename =
    //   window.location.origin + history.createHref({ pathname: "/" });
    // console.log(basename);
    try {
      await oktaAuth.signOut({
        // postLogoutRedirectUri: "http://localhost:3000/login",
        // postLogoutRedirectUri:
        // "https://dev-22765156-admin.okta.com/admin/app/oidc_client/instance/0oa8wf370wGB61FAL5d7",
      });
    } catch (err) {
      if (isCorsError(err)) {
        setCorsErrorModalOpen(true);
      } else {
        throw err;
      }
    }
  }; */

  // const logout = () =>{

  //   redirectUri: "https://developer.okta.com/login/",

  // }

  if (!authState) {
    return null;
  }
  console.log("is authenticated?", authState.isAuthenticated);
  console.log("the authstate is:", authState);
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <Image size="mini" src={logo} />
            &nbsp;
            <Link to="/">Archibus</Link>
          </Menu.Item>
          {/* {authState.isAuthenticated && (
            <Menu.Item id="messages-button">
              <Icon name="mail outline" />
              <Link to="/messages">Messages</Link>
            </Menu.Item>
          )} */}
          {authState.isAuthenticated && (
            <Menu.Item id="profile-button">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
          )}
          {authState.isAuthenticated && (
            <Menu.Item id="todo-button">
              <Link to="/todo">Todo List</Link>
            </Menu.Item>
          )}
          {authState.isAuthenticated && (
            <Menu.Item id="logout-button" onClick={logout}>
              Logout
            </Menu.Item>
          )}
          {!authState.isPending && !authState.isAuthenticated && (
            <Menu.Item onClick={login}>Login</Menu.Item>
          )}
        </Container>
      </Menu>
    </div>
  );
};
export default Navbar;

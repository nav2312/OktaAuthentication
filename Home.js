import { useOktaAuth } from "@okta/okta-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header } from "semantic-ui-react";
// import Api from "./utils/Api";
// import { API_URL_LIST } from "./utils/ApiConstants";
// import OktaAuth from "@okta/okta-auth-js";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth
        .getUser()
        .then((info) => {
          setUserInfo(info);
          setAccessToken(oktaAuth.getAccessToken());
        })
        .catch((err) => {
          console.error(err);
        });
      // const API = Api();
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    oktaAuth.signInWithRedirect({ originalUri: "/" });
    navigate("/login");
  };

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <div id="home">
      <div>
        {authState.isAuthenticated && userInfo && (
          <Header as="h1">Todo List app using Okta Authorization</Header>
        )}
        {authState.isAuthenticated && !userInfo && (
          <div>Loading user information...</div>
        )}

        {authState.isAuthenticated && userInfo && (
          <div>
            <p id="welcome">
              Welcome, &nbsp;
              {userInfo.name}!
            </p>
            {/*
            <p>
              You have successfully authenticated against your Okta org, and
              have been redirected back to this application. You now have an ID
              token and access token in local storage. Visit the{" "}
              <a href="/profile">My Profile</a> page to take a look inside the
              ID token.
            </p>
            {/* <p>
              Once you have downloaded and started the example resource server,
              you can visit the <a href="/Todo">Todo List app</a> page to see
              the authentication process in action.
            </p>
            <p>
              `<h2> Access Token : </h2>
              {accessToken}`
            </p> */}
          </div>
        )}
        {!authState.isAuthenticated && (
          <div>
            <Button id="login-button" primary onClick={login}>
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;

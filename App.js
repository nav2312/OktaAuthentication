import React, { useState } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { Container } from "semantic-ui-react";
import config from "./config";
import Home from "./Home";
// import Messages from "./Messages";
import Navbar from "./Navbar";
import Todo from "./components/Todo/Todo";
import Profile from "./Profile";
import CorsErrorModal from "./CorsErrorModal";
import AuthRequiredModal from "./AuthRequiredModal";
import ProtectedRoutes from "./ProtectedRoutes";

const oktaAuth = new OktaAuth(config.oidc);

const App = () => {
  const [corsErrorModalOpen, setCorsErrorModalOpen] = React.useState(false);

  const [authRequiredModalOpen, setAuthRequiredModalOpen] =
    React.useState(false);

  const history = useNavigate(); // example from react-router

  const triggerLogin = () => {
    // Redirect to the /login page that has a CustomLoginComponent
    history("/login");
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    // history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    history("/");
  };

  const customAuthHandler = async () => {
    const previousAuthState = oktaAuth.authStateManager.getPreviousAuthState();
    if (!previousAuthState || !previousAuthState.isAuthenticated) {
      // App initialization stage
      triggerLogin();
    } else {
      // Ask the user to trigger the login process during token autoRenew process
      setAuthRequiredModalOpen(true);
    }
  };

  const onAuthResume = async () => {
    history("/login");
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Navbar {...{ setCorsErrorModalOpen }} />
      <CorsErrorModal {...{ corsErrorModalOpen, setCorsErrorModalOpen }} />
      <AuthRequiredModal
        {...{ authRequiredModalOpen, setAuthRequiredModalOpen, triggerLogin }}
      />
      console.log('trigger login....',triggerLogin);
      <Container text style={{ marginTop: "7em" }}>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="login/callback" element={<LoginCallback />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Container>
    </Security>
  );
};

export default App;

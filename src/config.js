export default {
  oidc: {
    clientId: "0oa8wf370wGB61FAL5d7",
    issuer: "https://dev-22765156.okta.com/oauth2/default",
    redirectUri: "http://localhost:3000/login/callback",
    scopes: ["openid", "profile", "email"],
    pkce: true,
    disableHttpsCheck: true,
  },
  resourceServer: {
    // messagesUrl: "http://localhost:3000/api/messages",
  },
  app: {
    basename: "",
  },
};

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { API_URI } from "./ApiConstants";

const Api = async ({ payload, data = null }) => {
  const { authState, oktaAuth } = useOktaAuth();
  let secureHeader = {
    "Content-Type": "application/json",
  };
  const [accessToken, setAccessToken] = useState(null);
  const [datalist, setPost] = React.useState(null);
  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const accessToken = oktaAuth.getAccessToken();
      setAccessToken(accessToken);
    }
    // axios.get("localhost:3002/todoItems").then((response) => {
    //   console.log(response.data);
    //   setPost(response.data);
    // });
  }, [authState]);

  if (payload?.isTokenRequire || false) {
    secureHeader = {
      ...secureHeader,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  const axiosPayload = {
    url: `${API_URI}/${payload.url}`,
    method: payload.method,
    headers: secureHeader,
  };
  if (Object.keys(data).length) {
    axiosPayload["data"] = data;
  }
  const response = await axios(axiosPayload);
  return response.data;
};

export default Api;

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Cookie from "js-cookie";
import { parseCookies } from "../lib/parseCookies";
import createAuth0Client from "@auth0/auth0-spa-js";
import { access } from "fs";
// Load AuthForm as an AMP page
export const config = { amp: "hybrid" };

const Login = initialObject => {
  const { initialRememberValue } =
    initialObject && initialObject.initialRememberValue
      ? initialObject
      : { initialRememberValue: undefined };
  const [rememberMe, setRememberMe] = useState(() =>
    JSON.parse(initialRememberValue)
  );

  const [authToken, setAuthToken] = useState(() => "bullshit token");

  const auth0Client = createAuth0Client({
    domain: "dev-l4sg3wav.auth0.com",
    client_id: "ICCkgINzCPDq66k7nuFmdrFwEjt2Uv8f",
    redirect_uri: "http://localhost:3000/login",
    audience: "https://dev-l4sg3wav.auth0.com/api/v2/"
  });

  useEffect(() => {
    Cookie.set("rememberMe", JSON.stringify(rememberMe));
  }, [rememberMe]);

  return (
    <Layout>
      <div>
        remember me
        <input
          type="checkbox"
          value={rememberMe}
          checked={rememberMe}
          onChange={e => setRememberMe(e.target.checked)}
        />
      </div>
      <button
        onClick={() => {
          auth0Client.then(auth0 => {
            return auth0.loginWithRedirect().then(something => {
              return auth0.handleRedirectCallback();
            });
          });
        }}
      >
        Auth yourself
      </button>
      <div>{authToken}</div>
      <button
        onClick={() => {
          auth0Client.then(auth0 => {
            return auth0.logout();
          });
        }}
      >
        Log out
      </button>
      <button
        onClick={async () => {
          const auth0 = await auth0Client;
          const accessToken = auth0.getTokenSilently();
          const result = await fetch("http://localhost:8000/amIAuthorized", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          console.log(result);
        }}
      >
        Send request to authenticated endpoint
      </button>
    </Layout>
  );
};

Login.getInitialProps = async ({ req }) => {
  const cookies = parseCookies(req);

  return {
    initialRememberValue: cookies.rememberMe
  };
};

export default Login;

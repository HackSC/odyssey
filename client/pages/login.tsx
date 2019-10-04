import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Cookie from "js-cookie";
import { parseCookies } from "../lib/parseCookies";
import auth0 from "auth0-js";
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
          const webAuth = new auth0.WebAuth({
            domain: "dev-l4sg3wav.auth0.com",
            clientID: "ICCkgINzCPDq66k7nuFmdrFwEjt2Uv8f",
            redirectUri: "http://localhost:3000/",
            audience: "https://dev-l4sg3wav.auth0.com/api/v2/",
            responseType: "id_token token",
            scope: "openid profile email"
          });
          webAuth.popup.authorize({}, function(err, response) {});
        }}
      >
        Auth yourself
      </button>
    </Layout>
  );
};
/*
 domain: config.domain,
    clientID: config.clientId,
    redirectUri: config.redirect,
    audience: config.audience,
    responseType: "id_token token",
    scope: "openid profile email"
    */

Login.getInitialProps = async ({ req }) => {
  const cookies = parseCookies(req);

  return {
    initialRememberValue: cookies.rememberMe
  };
};

export default Login;

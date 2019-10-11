import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import Cookie from "js-cookie";
import { parseCookies } from "../lib/parseCookies";
import createAuth0Client from "@auth0/auth0-spa-js";

// Load AuthForm as an AMP page
export const config = { amp: "hybrid" };

export var auth0 = null;
export const getAuth0Provider = async () => {
  if (auth0 != null) {
    return auth0;
  }
  auth0 = await createAuth0Client({
    domain: "dev-l4sg3wav.auth0.com",
    client_id: "ICCkgINzCPDq66k7nuFmdrFwEjt2Uv8f",
    redirect_uri: "http://localhost:3000/login"
  });
  return auth0;
};

export const handleAuth0Redirect = async () => {
  const auth0 = await getAuth0Provider();
  await auth0.handleRedirectCallback();
  console.log("We get here!");
  window.history.replaceState({}, document.title, "/");
};

const Login = initialObject => {
  const { initialRememberValue } =
    initialObject && initialObject.initialRememberValue
      ? initialObject
      : { initialRememberValue: undefined };
  const [rememberMe, setRememberMe] = useState(() => JSON.parse("{}"));

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
      handleAuth0Redirect();
      setIsAuthenticated(true);
    }
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
      {!isAuthenticated && (
        <button
          onClick={async () => {
            const auth0 = await getAuth0Provider();
            console.log(auth0);
            await auth0.loginWithRedirect({
              redirect_uri: "http://localhost:3000/login"
            });
          }}
        >
          Log In
        </button>
      )}
      {isAuthenticated && (
        <button
          onClick={async () => {
            const auth0 = await getAuth0Provider();
            auth0.logout();
            setIsAuthenticated(false);
          }}
        >
          Log out
        </button>
      )}
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

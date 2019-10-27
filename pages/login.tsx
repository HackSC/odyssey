import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import Cookie from "js-cookie";
import { parseCookies } from "../lib/parseCookies";
import { getUser } from "../lib/authenticate";

// Load AuthForm as an AMP page
export const config = { amp: "hybrid" };

const Login = initialObject => {
  const { initialRememberValue } =
    initialObject && initialObject.initialRememberValue
      ? initialObject
      : { initialRememberValue: undefined };

  const { user } = initialObject;
  const [rememberMe, setRememberMe] = useState(() => JSON.parse("{}"));

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
      {!user && <a href="auth/login"> Log In </a>}
      {user && <a href="auth/logout"> Log out </a>}
    </Layout>
  );
};

Login.getInitialProps = async ({ req }) => {
  const cookies = parseCookies(req);
  const user = await getUser(req);
  return {
    initialRememberValue: cookies.rememberMe,
    user: user
  };
};

export default Login;

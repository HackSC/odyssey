import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Cookie from "js-cookie";
import { parseCookies } from "../lib/parseCookies";

// Load AuthForm as an AMP page
export const config = { amp: 'hybrid' };

const Login = (initialObject) => {
  const { initialRememberValue } = initialObject && initialObject.initialRememberValue ? initialObject : { initialRememberValue: undefined };
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
    </Layout>);
}

Login.getInitialProps = async ({ req }) => {
  const cookies = parseCookies(req);

  return {
    initialRememberValue: cookies.rememberMe
  };
}

export default Login;
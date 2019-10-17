import React, { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";
import { apiHost } from "../config";
import Layout from "../components/Layout";
import { ContentBlockWide } from "../styles";
import Cookie from "js-cookie";
import { parseCookies } from "../lib/parseCookies";
import { getUser } from "../lib/authenticate";

// Load Index as an AMP page
export const config = { amp: "hybrid" };

const Home = initialObject => {
  const { message, user } = initialObject;
  if (user) {
    console.log(user._json.email_verified);
  }
  const { initialRememberValue } =
    initialObject && initialObject.initialRememberValue
      ? initialObject
      : { initialRememberValue: undefined };
  const [rememberMe, setRememberMe] = useState(() => JSON.parse("{}"));

  useEffect(() => {
    Cookie.set("rememberMe", JSON.stringify(rememberMe));
  }, [rememberMe]);

  var authMessage = "You're not logged in";
  if (user) {
    authMessage = user._json.email_verified
      ? user.nickname
      : "You haven't verified email";
  }

  return (
    <Layout>
      <ContentBlockWide>
        <h1>Cookie Demo </h1>
        <p> check the box and refresh the page:</p>
        <div>
          remember me
          <input
            type="checkbox"
            value={rememberMe}
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
          />
        </div>
      </ContentBlockWide>
      <ContentBlockWide>
        <h1>Willie's API Demo</h1>
        {message ? message : "Loading..."}
      </ContentBlockWide>
      <ContentBlockWide>
        <h1> Authentication Status </h1>
        {authMessage}
      </ContentBlockWide>
      <ContentBlockWide>
        <h1>Sponsorship </h1>
        <p> Companies go here...</p>
      </ContentBlockWide>
    </Layout>
  );
};

Home.getInitialProps = async ({ req }) => {
  const res = await fetch(`${apiHost}/api/random`);
  const json = await res.json();
  const user = await getUser(req);
  const cookies = parseCookies(req);

  return {
    message: json.message,
    initialRememberValue: cookies.rememberMe,
    user: user
  };
};

export default Home;

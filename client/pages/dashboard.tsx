import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import Cookie from "js-cookie";
import { parseCookies } from "../lib/parseCookies";
import { getUser, handleLoginRedirect } from "../lib/authenticate";
import createAuth0Client from "@auth0/auth0-spa-js";

// Load AuthForm as an AMP page
export const config = { amp: "hybrid" };

const Dashboard = initialObject => {
  const { user } = initialObject;

  return (
    <Layout>
      <div>
        <div>Email: {user._json.email} </div>
        <div>Username: {user.nickname} </div>
        <div> Email Verified: {user._json.email_verified + ""} </div>
        <div>
          {" "}
          <a href={user.picture}> Picture </a>{" "}
        </div>
      </div>
    </Layout>
  );
};

Dashboard.getInitialProps = async ({ req }) => {
  const user = await getUser(req);
  if (!user) {
    // The user isn't signed in
    handleLoginRedirect(req);
  }
  return {
    user: user
  };
};

export default Dashboard;

import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import Cookie from "js-cookie";
import { parseCookies } from "../lib/parseCookies";
import { getUser, handleLoginRedirect } from "../lib/authenticate";
import createAuth0Client from "@auth0/auth0-spa-js";
import FormStepper from "../components/FormStepper";
import HomeStep from "../components/applicationSteps/HomeStep";
import ApplicationStep from "../components/applicationSteps/ApplicationStep";
import ProfileStep from "../components/applicationSteps/ProfileStep";
import ResultStep from "../components/applicationSteps/ResultStep";
// Load AuthForm as an AMP page
export const config = { amp: "hybrid" };

const formSteps: FormStep[] = [
  {
    title: "Home",
    component: HomeStep
  },
  {
    title: "Application",
    component: ApplicationStep
  },
  {
    title: "Profile",
    component: ProfileStep
  },
  {
    title: "Results",
    component: ResultStep
  }
];

const Dashboard = initialObject => {
  const { user } = initialObject;
  const [newProfile, setNewProfile] = useState({
    gender: "other",
    major: "computer science",
    skills: "none really",
    interests: "snowboarding"
  });
  return (
    <Layout>
      <div>
        <div> ID: {user.id} </div>
        <div>Email: {user._json.email} </div>
        <div>Username: {user.nickname} </div>
        <div> Email Verified: {user._json.email_verified + ""} </div>
        <div>
          <div> Create a user profile with the button below! </div>
          <div>
            <textarea
              value={JSON.stringify(newProfile)}
              onChange={e => {
                setNewProfile(JSON.parse(e.target.value));
              }}
            >
              {JSON.stringify(newProfile)}
            </textarea>
          </div>
          <button
            onClick={async () => {
              const profileData = JSON.stringify(newProfile);
              console.log(profileData);
              const res = await fetch("api/profile", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: profileData
              });
              console.log(res);
            }}
          >
            {" "}
            Click this to add a profile to the database{" "}
          </button>
        </div>
        <div>
          {" "}
          <a href={user.picture}> Picture </a>{" "}
        </div>
        <FormStepper serverStep={1} steps={formSteps}></FormStepper>
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

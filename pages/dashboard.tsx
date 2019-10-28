import React from "react";

import { getUser, handleLoginRedirect } from "../lib/authenticate";

import FormStepper from "../components/FormStepper";
import StatusStep from "../components/applicationSteps/StatusStep";
import ApplicationStep from "../components/applicationSteps/ApplicationStep";
import ProfileStep from "../components/applicationSteps/ProfileStep";
import ResultStep from "../components/applicationSteps/ResultStep";

// Load AuthForm as an AMP page
export const config = { amp: "hybrid" };

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const formSteps: FormStep[] = [
  {
    title: "Status",
    component: StatusStep
  },
  {
    title: "Profile",
    component: ProfileStep
  },
  {
    title: "Application",
    component: ApplicationStep
  },
  {
    title: "Results",
    component: ResultStep
  }
];

const Dashboard = ({ user }) => {
  return (
    <>
      <Navbar loggedIn />
      <FormStepper serverStep={0} steps={formSteps} user={user} />
      <Footer />
    </>
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

import React from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

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

const Dashboard = ({ profile }) => {
  return (
    <>
      <Navbar loggedIn />
      <FormStepper serverStep={1} steps={formSteps} profile={profile} />
      <Footer />
    </>
  );
};

Dashboard.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  return {
    profile
  };
};

export default Dashboard;

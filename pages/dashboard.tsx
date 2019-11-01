import React from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import Head from "../components/Head";
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
    slug: "status",
    component: StatusStep
  },
  {
    title: "Profile",
    slug: "profile",
    component: ProfileStep
  },
  {
    title: "Application",
    slug: "application",
    component: ApplicationStep
  },
  {
    title: "Results",
    slug: "results",
    component: ResultStep
  }
];

const Dashboard = ({ profile, step }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Dashboard" />
      <Navbar loggedIn />
      <FormStepper serverStep={step} steps={formSteps} profile={profile} />
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

  // Convert step param into an int
  const step =
    req && req.params && req.params.step
      ? req.params.step === "status"
        ? 0
        : req.params.step === "profile"
        ? 1
        : req.params.step === "application"
        ? 2
        : req.params.step === "results"
        ? 3
        : 0
      : 0;

  return {
    profile,
    step: step || 0
  };
};

export default Dashboard;

import React from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Background, Container } from "../styles";

import StatusStep from "../components/applicationSteps/StatusStep";

const Dashboard2 = ({ profile }) => {
  console.log(profile);

  return (
    <>
      <Head title="HackSC Odyssey - Dashboard" />
      <Navbar loggedIn />
      <Background>
        <Container>{profile && <StatusStep profile={profile} />}</Container>
      </Background>
      <Footer />
    </>
  );
};

Dashboard2.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  return {
    profile
  };
};

export default Dashboard2;

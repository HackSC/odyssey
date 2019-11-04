import React from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Background, Container } from "../styles";

import Step from "../components/steps/Results";

const Results = ({ profile }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar loggedIn />
      <Background>
        <Container>{profile && <Step profile={profile} />}</Container>
      </Background>
      <Footer />
    </>
  );
};

Results.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  return {
    profile
  };
};

export default Results;

import React from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import { Head, Navbar, Footer, Results as ResultStep } from "../components";

import { Background, Container } from "../styles";

const Results = ({ profile }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar
        loggedIn
        showProjectTeam={profile?.status === "checkedIn"}
        activePage="results"
      />
      <Background>
        <Container>{profile && <ResultStep profile={profile} />}</Container>
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
    profile,
  };
};

export default Results;

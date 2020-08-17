import React from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import { getReferrerCode } from "../lib/referrerCode";

import Head from "./Head";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { Background, Container } from "../styles";

import Step from "./steps/Profile";

const Application = ({ profile }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn activePage="application" />
      <Background>
        <Container>{profile && <Step profile={profile} />}</Container>
      </Background>
      <Footer />
    </>
  );
};

Application.getInitialProps = async ctx => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  //Referrer Code Special Case Handling
  profile.referrerCode = getReferrerCode(ctx, profile);

  return {
    profile
  };
};

export default Application;

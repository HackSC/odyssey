import React from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import { getReferrerCode } from "../lib/referrerCode";

import styled from "styled-components";

import Iframe from "react-iframe";
import { Head, Navbar, Footer, AdminStats } from "../components";

import { Background, Flex, Container } from "../styles";

const Metabase = ({ profile }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn admin activePage="/admin-stats" />
      <Background>
        <Container>
          <PaddedFlex direction="column">
            <h1>Admin Statistics</h1>
          </PaddedFlex>

          <AdminStats showtitle={false} profile={profile} />

          <PaddedFlex>
            <h1>Metabase Statistics</h1>
          </PaddedFlex>
          <PaddedFlex style={{ margin: "auto", width: "min-content" }}>
            <Iframe
              url="http://metabase.hacksc.com/public/dashboard/29e596c2-2fa7-4bfd-abf2-ef3cd3034a79"
              src="http://metabase.hacksc.com/public/dashboard/29e596c2-2fa7-4bfd-abf2-ef3cd3034a79"
              width="800"
              height="600"
              styles={{ margin: "auto", borderRadius: "15px" }}
            ></Iframe>
          </PaddedFlex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

Metabase.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || profile.role !== "admin") {
    handleLoginRedirect(req);
  }
  if (profile) {
    //Referrer Code Special Case Handling
    profile.referrerCode = getReferrerCode(ctx, profile);
  }

  return {
    profile,
  };
};

const PaddedFlex = styled(Flex)`
  padding: 2rem 0 1rem 0;
`;

export default Metabase;

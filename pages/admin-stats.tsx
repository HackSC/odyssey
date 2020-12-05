import React from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import { getReferrerCode } from "../lib/referrerCode";

import styled from "styled-components";

import Iframe from "react-iframe";
import { Head, Navbar, Footer, AdminStats } from "../components";

import { Background, Flex, Container } from "../styles";
import jwt from "jsonwebtoken";

const Metabase = ({ profile, metabaseIframeUrl }) => {
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
              src={metabaseIframeUrl}
              width="800"
              height="600"
              styles={{ margin: "auto", borderRadius: "15px" }}
              frameBorder={0}
              //@ts-ignore
              allowtransparency
            ></Iframe>
          </PaddedFlex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

export async function getServerSideProps(ctx) {
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

  const payload = {
    resource: { dashboard: 12 },
    params: {},
    exp: Math.round(Date.now() / 1000) + 10 * 60, // 10 minute expiration
  };

  const token = jwt.sign(payload, process.env.METABASE_SECRET_KEY);
  const iframeUrl =
    process.env.METABASE_SITE_URL +
    "/embed/dashboard/" +
    token +
    "#bordered=true&titled=true";

  return {
    props: {
      profile,
      metabaseIframeUrl: iframeUrl,
    },
  };
}

const PaddedFlex = styled(Flex)`
  padding: 2rem 0 1rem 0;
`;

export default Metabase;

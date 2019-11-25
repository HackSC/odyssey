import React from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import { getReferrerCode } from "../lib/referrerCode";

import styled from "styled-components";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Background, Flex, Container } from "../styles";

const Admin = ({ profile }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn admin activePage="/" />
      <Container>
        <Flex direction="column">
          <h1>Admin Stuff</h1>
        </Flex>
        <h2> Actions</h2>
        <a href="/appReview">Start App Review</a>
      </Container>
      <Footer />
    </>
  );
};

Admin.getInitialProps = async ctx => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || profile.role !== "admin") {
    handleLoginRedirect(req);
  }
  //Referrer Code Special Case Handling
  profile.referrerCode = getReferrerCode(ctx, profile);

  return {
    profile
  };
};

const Label = styled.label`
  padding: 48px;
  font-size: 25px;
`;

const Status = styled(Flex)`
  padding: 48px;
  margin: 16px 0 32px;
  background: #ffffff;
  border-radius: 4px;

  h2 {
    padding: 0;
    margin-left: 16px;
  }

  ${({ theme }) =>
    theme.media.tablet`
      padding: 32px;
    `}
`;

export default Admin;

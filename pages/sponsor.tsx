import React from "react";
import styled from "styled-components";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import { getReferrerCode } from "../lib/referrerCode";
import { Head, Navbar, Footer } from "../components";
import { Button, Background, Flex, Container } from "../styles";

const Sponsor = ({ profile }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn sponsor activePage="/" />
      <Background>
        <Container>
          <Flex direction="column">
            <h1>Sponsor Dashboard</h1>
            <p>
              Hello there -- welcome to the sponsor dashboard. Here you can
              access actions and data for HackSC. If you have any questions or
              find any errors, let the organizers know in <b>#sponsors</b>
            </p>
          </Flex>

          <ActionsHeader>Actions</ActionsHeader>
          <Actions>
            <Action id="scan-page" href="/admin/scan">
              <ActionTitle>Scan In Hackers</ActionTitle>
            </Action>
            <Action id="hacker-manager-page" href="/admin/hackerManager">
              <ActionTitle> Manage Hackers </ActionTitle>
            </Action>
            <Action
              id="metabase-page"
              href="https://metabase.hacksc.com/"
              target="_blank"
            >
              <ActionTitle>Access Metabase</ActionTitle>
            </Action>
          </Actions>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

Sponsor.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || !(profile.role == "admin" || profile.role == "sponsor")) {
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

const ActionsHeader = styled.h2`
  margin: 48px 0 16px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const Action = styled.a`
  box-sizing: border-box;
  padding: 24px 36px;
  margin: 0 0 16px;
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  flex-basis: 49%;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  transition: 0.25s all;

  &:hover {
    transform: scale(1.025);
  }
`;

const ActionTitle = styled.h3`
  padding-bottom: 0;
  color: ${({ theme }) => theme.colors.gray50};
`;

export default Sponsor;

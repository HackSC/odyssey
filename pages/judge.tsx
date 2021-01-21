import React from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import { getReferrerCode } from "../lib/referrerCode";

import styled from "styled-components";

import { Head, Navbar, Footer } from "../components";
import { Button, Background, Flex, Container } from "../styles";

const Judge = ({ profile }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn judge activePage="/" />
      <Background>
        <Container>
          <Flex direction="column">
            <h1>Judge Dashboard</h1>
            <p>
              Hello there -- welcome to the judge dashboard. Here you can access
              actions to help organize and run HackSC. If you have any questions
              or find any errors, hit up the organizers in <b>#judges</b>
            </p>
          </Flex>

          <ActionsHeader>Actions</ActionsHeader>
          <Actions>
            <Action id="scan-page" href="/admin/scan">
              <ActionTitle>Scan In Hackers</ActionTitle>
            </Action>
            <Action id="checkin-page" href="/admin/checkin">
              <ActionTitle>Check In Hackers</ActionTitle>
            </Action>
            <Action id="pass-judgment-page" href="/admin/passJudgment">
              <ActionTitle> Pass Judgment </ActionTitle>
            </Action>
          </Actions>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

Judge.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (
    !profile ||
    !(
      profile.role == "admin" ||
      profile.role == "judge" ||
      profile.role == "superadmin"
    )
  ) {
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

export default Judge;

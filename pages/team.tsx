import React from "react";
import styled from "styled-components";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CreateTeamForm from "../components/CreateTeamForm";
import JoinTeamForm from "../components/JoinTeamForm";
import Team from "../components/Team";

import { Background, Container, Flex, Column } from "../styles";

async function getTeam(req): Promise<Team> {
  // If we have a req object, that means we're on the server and need to pass in cookies
  // Otherwise, fetch as normal
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/team"
    : /* Client */ "/api/team";
  const rawTeamData = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers
        }
      : null
  );

  try {
    const data = await rawTeamData.json();

    if (data.team) {
      return data.team;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}

const Teams = ({ profile, team, status }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Team Setup" />
      <Navbar loggedIn activePage="team" />
      <Background>
        <Container>
          <h1>HackSC Team Setup</h1>

          <p>
            On this tab, you can join, create, and view your HackSC team. To
            join a team, simply enter a team code given to you by a team mate.
            If you'd like to create a team, enter a team name and send out your
            team's code to potential team mates.
          </p>

          <br />

          <p>
            <b>NOTE:</b> Teams are capped out at 4 members.
          </p>

          <br />

          {status === "created" ? (
            <Message>You have successfully created a team</Message>
          ) : status === "joined" ? (
            <Message>You have successfully joined a team</Message>
          ) : status === "left" ? (
            <Message>You have succesfully left a team</Message>
          ) : status === "deleted" ? (
            <Message>You have successfully deleted a team</Message>
          ) : null}

          {team ? (
            <Team team={team} profile={profile} />
          ) : (
            <NoTeamFlex direction="row" tabletVertical justify="space-between">
              <Column flexBasis={48}>
                <JoinTeamForm />
              </Column>

              <Column flexBasis={48}>
                <CreateTeamForm />
              </Column>
            </NoTeamFlex>
          )}
        </Container>
      </Background>
      <Footer />
    </>
  );
};

Teams.getInitialProps = async ({ req, query }) => {
  const profile = await getProfile(req);
  const team = await getTeam(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  let status = null;
  if ("joined" in query) {
    status = "joined";
  }

  if ("left" in query) {
    status = "left";
  }

  if ("deleted" in query) {
    status = "deleted";
  }

  if ("created" in query) {
    status = "created";
  }

  return {
    profile,
    team,
    status
  };
};

const Message = styled.p`
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  padding: 24px 0;
  border: 2px solid ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.gray50};
  border-radius: 16px;
  margin-bottom: 16px;
`;

const NoTeamFlex = styled(Flex)`
  margin-top: 48px;
`;

export default Teams;

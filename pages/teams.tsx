import React from "react";

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

const Teams = ({ profile, team }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Teams" />
      <Navbar loggedIn activePage="Teams" />
      <Background>
        <Container>
          <h1>Teams</h1>

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

          {team ? (
            <Team team={team} profile={profile} />
          ) : (
            <Flex direction="row" tabletVertical justify="space-between">
              <Column flexBasis={48}>
                <JoinTeamForm />
              </Column>

              <Column flexBasis={48}>
                <CreateTeamForm />
              </Column>
            </Flex>
          )}
        </Container>
      </Background>
      <Footer />
    </>
  );
};

Teams.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const team = await getTeam(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  return {
    profile,
    team
  };
};

export default Teams;

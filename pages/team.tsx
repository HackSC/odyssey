import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import TeammateSuggestions from "../components/TeammateSuggestions";
import TeamSuggestions from "../components/TeamSuggestions";
import ButtonWithTextForm from "../components/ButtonWithTextForm";
import Router from "next/router";

import {
  Head,
  Navbar,
  Footer,
  CreateTeamForm,
  JoinTeamForm,
  Team,
} from "../components";
import { Background, Container, Flex, Column } from "../styles";

import {
  getTeammateSuggestions,
  getPendingRequests,
  getPendingInvites,
  getTeamSuggestions,
} from "../lib/matching";

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
          headers: req.headers,
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

const Teams = ({
  profile,
  team,
  status,
  teammateSuggestions,
  teamSuggestions,
  pendingRequests,
  pendingInvites,
}) => {
  const [visible, setVisible] = useState(profile?.lookingForTeam);
  const handleChangeVisibility = () => {
    setVisible(!visible);
    updateVisibility();
  };

  const handleJoinProjectTeam = useCallback(async (code: string) => {
    const urlRoute = "/api/team/join/" + code;

    const res = await fetch(urlRoute, {
      method: "POST",
      body: "",
      credentials: "include",
    });

    if (res.status === 200) {
      await Router.push("/team?joined");
      window.scrollTo(0, 0);
    }
  }, []);

  async function handleRequestProjectTeam(teamId: number) {
    const urlRoute = "/api/teamMatching/request/";
    const result = await fetch(urlRoute, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        teamId: teamId,
      }),
    });
    if (result.status === 200) {
      await Router.push("/team");
    }
  }

  async function updateVisibility() {
    const urlRoute = "/api/profile/visibility/";
    const result = await fetch(urlRoute, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    });
    return result.status === 200;
  }

  async function handleAddPortfolio(url: string) {
    const urlRoute = "/api/profile/portfolio/";

    const result = await fetch(urlRoute, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        portfolioUrl: url,
      }),
    });
    return result.status === 200;
  }

  return (
    <>
      <Head title="HackSC Odyssey - Team Setup" />
      <Navbar
        loggedIn
        showProjectTeam={profile?.status === "checkedIn"}
        activePage="team"
      />
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
            <Team
              team={team}
              profile={profile}
              teammateSuggestions={teammateSuggestions}
              pendingInvites={pendingInvites}
              pendingRequests={pendingRequests}
            />
          ) : (
            <>
              <NoTeamFlex
                direction="row"
                tabletVertical
                justify="space-between"
              >
                <Column flexBasis={48}>
                  <JoinTeamForm />
                </Column>

                <Column flexBasis={48}>
                  <CreateTeamForm />
                </Column>
              </NoTeamFlex>
              <NoTeamFlex
                direction="row"
                tabletVertical
                justify="space-between"
              >
                <Column flexBasis={48}>
                  <Title>Edit Profile</Title>
                  <ChangeProfileOption>
                    <input
                      name="visibility"
                      type="checkbox"
                      checked={visible}
                      onChange={handleChangeVisibility}
                    />
                    <ShareProfileText>
                      Share my profile with teams and other hackers for team
                      matching! My name, major, year, school, and top skills
                      will be shown to other hackers.
                    </ShareProfileText>
                  </ChangeProfileOption>
                </Column>
                <Column flexBasis={48}>
                  <ButtonWithTextForm
                    title="Add Portfolio"
                    label="Enter your LinkedIn/Website url"
                    buttonText="Add"
                    onSubmit={handleAddPortfolio}
                    initial={profile.portfolioUrl}
                  />
                </Column>
              </NoTeamFlex>
              {pendingInvites?.teams.length ? (
                <TeamSuggestions
                  type={"You've been invited!"}
                  handleOnClick={handleJoinProjectTeam}
                  teamSuggestions={pendingInvites}
                  buttonLabel={"Join"}
                />
              ) : (
                <div />
              )}
              {pendingRequests?.teams.length ? (
                <TeamSuggestions
                  type={"Your Pending Requests"}
                  handleOnClick={null}
                  teamSuggestions={pendingRequests}
                  buttonLabel={""}
                />
              ) : (
                <div />
              )}
              {teamSuggestions?.teams.length ? (
                <TeamSuggestions
                  type={"Team Suggestions"}
                  handleOnClick={handleRequestProjectTeam}
                  teamSuggestions={teamSuggestions}
                  buttonLabel={"Request to Join"}
                />
              ) : (
                <div />
              )}
              <TeammateSuggestions
                title={"Teammate Suggestions"}
                hackers={teammateSuggestions}
                owner="hacker"
                teamId={null}
              />
            </>
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

  const teammateSuggestions = await getTeammateSuggestions(
    req,
    team ? "team" : "hacker"
  );
  const pendingRequests = await getPendingRequests(
    req,
    team ? "team" : "hacker"
  );
  const pendingInvites = await getPendingInvites(req, team ? "team" : "hacker");
  const teamSuggestions = await getTeamSuggestions(req);

  return {
    profile,
    team,
    status,
    teammateSuggestions,
    teamSuggestions,
    pendingRequests,
    pendingInvites,
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

const Title = styled.h2`
  padding-top: 0px;
  padding-bottom: 0;
`;

const ChangeProfileOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ShareProfileText = styled.div`
  padding-left: 20px;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 16px;
  line-height: 22px;
`;

export default Teams;

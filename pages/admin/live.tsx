import React, { useState } from "react";
import * as Sentry from "@sentry/browser";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  Head,
  Navbar,
  Footer,
  Countdown,
  QRCode,
  HouseProgress,
  BattlePass,
  LinkScroll,
  IncompleteTasks,
} from "../../components";

import {
  Container,
  Flex,
  CenteredColumn,
  Column,
  Background,
} from "../../styles";
import { generatePosts } from "../../lib/referrerCode";

import {
  useBattlepass,
  useAllHouseInfo,
  useAllTasks,
} from "../../lib/api-sdk/hackerLiveHooks";

import {
  handleLoginRedirect,
  getProfile,
  handleApplicationRedirect,
} from "../../lib/authenticate";

import hackathonConstants from "../../lib/hackathonConstants";
import styled from "styled-components";
import Events from "../../components/events/Events";
import { useEventsList } from "../../lib/api-sdk/eventHooks";

const Live = ({ profile, houses, socialPosts }) => {
  // * External Hooks
  const { allHouses } = useAllHouseInfo({});
  const { battlepass } = useBattlepass({ defaultOnError: console.log });
  const { allEvents } = useEventsList({ defaultOnError: console.log });
  const { allTasks } = useAllTasks({
    defaultOnError: console.log,
  });

  // * Local Hooks
  const [alert, setAlert] = useState(false);

  return (
    <>
      <Head title="HackSC Odyssey - Live Dashboard" />
      {profile && (profile.role == "admin" || profile.role == "volunteer") ? (
        <Navbar loggedIn admin activePage="live" />
      ) : (
        <Navbar
          loggedIn
          showProjectTeam={profile ? profile.status === "checkedIn" : false}
          activePage="live"
        />
      )}
      <Background>
        <Container>
          <Countdown />
          <PaddedFlex
            style={!alert ? { paddingTop: "2em" } : {}}
            justify="space-between"
            tabletVertical
          >
            <Column flexBasis={40}>
              <QRCode profile={profile} />
            </Column>

            <InstructionsColumn flexBasis={60}>
              <CheckInTitle>
                {profile && profile.firstName
                  ? `Hey there, ${profile.firstName}!`
                  : "Hey there!"}
              </CheckInTitle>

              <Flex justify="space-between" tabletVertical>
                <CenteredColumn flexBasis={100}>
                  <HouseProgress houses={allHouses} />
                </CenteredColumn>
              </Flex>
            </InstructionsColumn>
          </PaddedFlex>
          <PaddedFlex justify="space-between" tabletVertical>
            <MarginedColumn style={{ overflowX: "scroll" }} flexBasis={100}>
              <BattlePass
                bp={battlepass}
                userPoints={
                  battlepass
                    ? battlepass.reduce((a, b) => a + b.pointValue, 0)
                    : 0
                }
                projSubmitted={false}
              />
              <UnlockMessage>
                Premium tier prizes are unlocked when a team submits their
                project
              </UnlockMessage>
            </MarginedColumn>
          </PaddedFlex>
          <PaddedFlex tabletVertical>
            <Events events={allEvents} />
          </PaddedFlex>
          <PaddedFlex justify="space-between" tabletVertical>
            <MarginedColumn flexBasis={35}>
              <LinkScroll />
            </MarginedColumn>
            <MarginedColumn flexBasis={65}>
              <CheckInTitle>All Tasks</CheckInTitle>
              <IncompleteTasks incompleteTasks={allTasks} />
            </MarginedColumn>
          </PaddedFlex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

Live.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const houses = [];

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  } else {
    let is_super_user =
      profile.role == "admin" ||
      profile.role == "volunteer" ||
      profile.role == "sponsor" ||
      profile.role == "superadmin" ||
      profile.role == "judge";

    if (profile && !is_super_user && !hackathonConstants.showLive) {
      // Redirect user to dashboard if they are logged in
      handleApplicationRedirect(req);
    }
  }

  if (typeof window !== "undefined") {
    Sentry.configureScope(function (scope) {
      scope.setExtra("profile", profile);
    });
  }

  let socialPosts = {};
  if (profile) {
    socialPosts = generatePosts(profile);
  }

  return {
    houses,
    profile,
    socialPosts,
  };
};

const PaddedFlex = styled(Flex)`
  padding: 1em;
`;

const MarginedColumn = styled(Column)`
  margin: 1rem;
`;

const InstructionsColumn = styled(Column)`
  margin: 0 15px;
  ${({ theme }) =>
    theme.media.tablet`
    margin-top: 32px;
    text-align: center;
  `}
`;

const CheckInTitle = styled.h2`
  text-align: center;
  padding-bottom: 15px;
`;

const UnlockMessage = styled.p`
  font-size: 18px;
  font-style: italic;
`;

export default Live;

import React from "react";
import styled from "styled-components";
import { TwitterTimelineEmbed } from "react-twitter-embed";

import { Head, Navbar, Footer } from "../../components";
import { Background, Flex, Container, Column } from "../../styles";
import {
  sendSlackMessage,
  getReferrerCode,
  handleLoginRedirect,
  getProfile,
} from "../../lib";

const Admin = ({ profile }) => {
  // * Logic to send slack message when metabase link is clicked
  const send_slack_msg = async (e) => {
    let firstName = profile ? profile.firstName : "";
    let lastName = profile ? profile.lastName : "";
    let user_email = profile ? profile.email : "";
    let start_and_end_date =
      new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() + "";
    let slack_result = await sendSlackMessage(
      ":hot_pepper: Admin Metabase accessed by " +
        firstName +
        ", " +
        lastName +
        ", " +
        user_email,
      "",
      start_and_end_date,
      start_and_end_date
    );
  };

  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn admin activePage="/" />
      <Background padding="3rem 0">
        <Container width={"96%"}>
          <SubContainerFlex direction="row">
            <TwitterColumn flexBasis={35}>
              <TwitterFlex>
                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName="hackscofficial"
                  options={{ height: "90%" }}
                  style={{ height: "90%" }}
                  autoHeight={true}
                  theme={false ? "dark" : "light"}
                />
              </TwitterFlex>
            </TwitterColumn>
            <ActionColumn flexBasis={65}>
              <Flex direction="column">
                <TitleFlex direction="row">
                  <ZeroPaddedH1>Admin Dashboard</ZeroPaddedH1>
                </TitleFlex>
                <p>
                  Hello there -- welcome to the admin dashboard. Here you can
                  access actions to help organize and run HackSC. If you have
                  any questions or find any errors, hit up the engineers in{" "}
                  <b>#{new Date().getFullYear()}-engineering</b>
                </p>

                <PaddedFlex direction="column">
                  <PaddedFlex direction="row">
                    <PaddedSubTitle>hacksc.com: </PaddedSubTitle>
                    <a href="https://status.hacksc.com">
                      <img src="https://betteruptime.com/status-badges/v1/monitor/50yh.svg"></img>
                    </a>
                  </PaddedFlex>
                  <PaddedFlex direction="row">
                    <PaddedSubTitle>staging.hacksc.com: </PaddedSubTitle>
                    <a href="https://status.hacksc.com">
                      <img src="https://betteruptime.com/status-badges/v1/monitor/518z.svg"></img>
                    </a>
                  </PaddedFlex>
                  <PaddedFlex direction="row">
                    <PaddedSubTitle>dashboard.hacksc.com: </PaddedSubTitle>
                    <a href="https://status.hacksc.com">
                      <img src="https://betteruptime.com/status-badges/v1/monitor/50yp.svg"></img>
                    </a>
                  </PaddedFlex>
                </PaddedFlex>
              </Flex>

              <ActionsHeader>Actions</ActionsHeader>
              <Actions>
                <Action id="scan-page" href="/admin/scan">
                  <ActionTitle>Scan In Hackers</ActionTitle>
                </Action>
                <Action id="app-review-page" href="/admin/appReview">
                  <ActionTitle>App Review</ActionTitle>
                </Action>
                <Action id="app-leaderboard-page" href="/admin/appLeaderboard">
                  <ActionTitle>App Leaderboard</ActionTitle>
                </Action>
                <Action id="checkin-page" href="/admin/checkin">
                  <ActionTitle>Check In Hackers</ActionTitle>
                </Action>
                <Action id="role-manager-page" href="/admin/roleManager">
                  <ActionTitle> Manage Roles </ActionTitle>
                </Action>
                <Action id="task-manager-page" href="/admin/taskManager">
                  <ActionTitle> Manage Available Tasks </ActionTitle>
                </Action>
                <Action id="house-manager-page" href="/admin/houseManager">
                  <ActionTitle> Manage Houses </ActionTitle>
                </Action>
                <Action
                  id="schedule-manager-page"
                  href="/admin/scheduleManager"
                >
                  <ActionTitle> Manage Event Schedule </ActionTitle>
                </Action>
                {/* <Action
              id="helpful-link-manager-page"
              href="/admin/helpfulLinkManager"
            >
              <ActionTitle> Manage Helpful Links </ActionTitle>
            </Action> */}
                <Action id="hacker-manager-page" href="/admin/hackerManager">
                  <ActionTitle> Manage Hackers </ActionTitle>
                </Action>
                <Action id="judging-manager-page" href="/admin/judgingManager">
                  <ActionTitle> Pass Judgement </ActionTitle>
                </Action>
                <Action
                  id="battlepass-manager-page"
                  href="/admin/battlepassManager"
                >
                  <ActionTitle> Edit Battlepass </ActionTitle>
                </Action>
                <Action id="mail-query-page" href="/admin/mailQuery">
                  <ActionTitle> Mail Signups </ActionTitle>
                </Action>
                <Action
                  id="manage-api-directory-page"
                  href="/admin/manageApiDirectory"
                >
                  <ActionTitle> Manage Api Directory </ActionTitle>
                </Action>
                <Action
                  id="metabase-page"
                  href="https://metabase.hacksc.com/"
                  target="_blank"
                  onClick={(e) => send_slack_msg(e)}
                >
                  <ActionTitle>Access Metabase</ActionTitle>
                </Action>
                <Action id="test-console-page" href="/admin/testconsole">
                  <ActionTitle> Experimental Console </ActionTitle>
                </Action>
              </Actions>
            </ActionColumn>
          </SubContainerFlex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

Admin.getInitialProps = async (ctx) => {
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

const ActionColumn = styled(Column)`
  padding: 1rem;
  min-width: 300px;
  margin: auto;
`;

const SubContainerFlex = styled(Flex)`
  flex-wrap: wrap;
  margin: auto;
`;

const TwitterColumn = styled(Column)`
  padding: 1rem;
  min-width: 300px;
  margin: 0 auto;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const TwitterFlex = styled(Flex)`
  padding-bottom: 3rem;
  height: 93%;
  justify-content: center;
`;

const ZeroPaddedH1 = styled.h1`
  padding-bottom: 0px;
`;

const TitleFlex = styled(Flex)`
  width: 100%;
  margin: 0 0 1rem 0;
`;

const PaddedSubTitle = styled.h3`
  margin: 0 1rem 0 0;
`;

const PaddedFlex = styled(Flex)`
  margin: 0.25rem 0 0 0;
`;

const ActionsHeader = styled.h2`
  margin: 2rem 0 1rem;
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
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  flex-basis: 49%;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  transition: 0.25s all;

  min-width: 200px;
  margin: auto auto 16px auto;

  &:hover {
    transform: scale(1.025);
  }
`;

const ActionTitle = styled.h3`
  padding-bottom: 0;
  color: ${({ theme }) => theme.colors.gray50};
`;

export default Admin;

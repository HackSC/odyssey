import styled from "styled-components";

const ActionsWidget = () => {
  return (
    <Wrapper>
      <Subheader>General</Subheader>
      <Actions>
        <Action
          id="metabase-page"
          href="https://metabase.hacksc.com/"
          target="_blank"
          onClick={(e) => send_slack_msg(e)}
        >
          <ActionTitle>Access Metabase</ActionTitle>
        </Action>
        <Action id="mail-query-page" href="/admin/mailQuery">
          <ActionTitle> Mail Signups </ActionTitle>
        </Action>
        <Action id="role-manager-page" href="/admin/roleManager">
          <ActionTitle> Manage Roles </ActionTitle>
        </Action>
        <Action id="hacker-manager-page" href="/admin/hackerManager">
          <ActionTitle> Export Hackers </ActionTitle>
        </Action>
      </Actions>

      <Subheader>Before the Hackathon (ideally...)</Subheader>
      <Actions>
        <Action id="app-review-page" href="/admin/appReview">
          <ActionTitle>App Review</ActionTitle>
        </Action>
        <Action id="battlepass-manager-page" href="/admin/battlepassManager">
          <ActionTitle> Edit Battlepass </ActionTitle>
        </Action>
        <Action id="task-manager-page" href="/admin/taskManager">
          <ActionTitle> Manage Available Tasks </ActionTitle>
        </Action>
        <Action id="house-manager-page" href="/admin/houseManager">
          <ActionTitle> Manage Houses </ActionTitle>
        </Action>
        <Action id="schedule-manager-page" href="/admin/scheduleManager">
          <ActionTitle> Manage Event Schedule </ActionTitle>
        </Action>
        <Action id="manage-api-directory-page" href="/admin/manageApiDirectory">
          <ActionTitle> Manage Api Directory </ActionTitle>
        </Action>
        <Action id="app-leaderboard-page" href="/admin/appLeaderboard">
          <ActionTitle>App Leaderboard</ActionTitle>
        </Action>
      </Actions>
      <Subheader>At the Hackathon</Subheader>
      <Actions>
        <Action id="scan-page" href="/admin/scan">
          <ActionTitle>Scan In Hackers</ActionTitle>
        </Action>
        <Action id="judging-manager-page" href="/admin/judgingManager">
          <ActionTitle> Pass Judgement </ActionTitle>
        </Action>
        <Action id="checkin-page" href="/admin/checkin">
          <ActionTitle>Check In Hackers</ActionTitle>
        </Action>
      </Actions>
      <Subheader>Experimental</Subheader>
      <Actions>
        <Action id="test-console-page" href="/admin/testconsole">
          <ActionTitle> Experimental Console </ActionTitle>
        </Action>
      </Actions>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const Subheader = styled.h3`
  width: 100%;
  margin: 8px 0;
`;

const Action = styled.a`
  color: #4a96f0;
  box-sizing: border-box;
  padding: 14px 16px;
  border-radius: 4px;
  text-align: center;
  flex-basis: 47%;
  box-shadow: 0 0 6px rgba(74, 150, 240, 0.4);
  transition: 0.25s all;

  min-width: 200px;
  margin: 16px 0;
  &:hover {
    box-shadow: 0 0 8px rgba(74, 150, 240, 0.6);
  }
`;

const ActionTitle = styled.h3`
  font-size: 16px;
  padding-bottom: 0;
`;

export default ActionsWidget;

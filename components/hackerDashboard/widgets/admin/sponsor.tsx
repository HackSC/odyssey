import { sendSlackMessage } from "@/lib";
import styled from "styled-components";

const send_slack_msg = async (e) => {
  let start_and_end_date =
    new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() + "";
  await sendSlackMessage(
    ":hot_pepper: Admin Metabase accessed!",
    "",
    start_and_end_date,
    start_and_end_date
  );
};

const SponsorActionsWidget = () => {
  return (
    <Wrapper>
      <Subheader> Actions </Subheader>
      <Actions>
        <Action
          id="metabase-page"
          href="https://metabase.hacksc.com/"
          target="_blank"
          onClick={(e) => send_slack_msg(e)}
        >
          <ActionTitle>Access Metabase</ActionTitle>
        </Action>
        <Action id="hacker-manager-page" href="/admin/hackerManager">
          <ActionTitle> Manage Hackers </ActionTitle>
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

export default SponsorActionsWidget;

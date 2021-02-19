import React, { useState, useCallback, useRef } from "react";

import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import { Form, FormGroup, Flex, Button } from "../../../styles";

import { CreateTeam, JoinTeam, CurrentTeam } from "./teamviews";

type Props = {
  team: Team;
  profile: Profile;
};

export enum TeamView {
  NoTeam,
  FindTeam,
  JoinTeam,
  CreateTeam,
  Team,
}

const TeamWidget = (props: Props) => {
  const { team, profile } = props;
  const [view, setView] = useState<TeamView>(!!team ? TeamView.Team : null);

  const { addToast } = useToasts();
  const onError = (e: string) => {
    addToast(e, { appearance: "error" });
  };

  if (view === null && view != TeamView.Team) {
    setView(TeamView.Team);
  }

  if (!team && view === TeamView.Team) {
    setView(TeamView.NoTeam);
  }

  if (view === TeamView.CreateTeam) {
    return <CreateTeam setView={setView} />;
  } else if (view === TeamView.JoinTeam) {
    return <JoinTeam setView={setView} />;
  } else if (view === TeamView.Team) {
    return <CurrentTeam profile={profile} setView={setView} team={team} />;
  } else {
    return (
      <>
        <Header>
          <h2>My Team</h2>
        </Header>
        <Info>
          Welcome! You aren't currently in a team. Choose one of the options
          below.
          <Flex direction="column">
            <MarginButton onClick={() => setView(TeamView.FindTeam)}>
              Find a team
            </MarginButton>
            <MarginButton onClick={() => setView(TeamView.JoinTeam)}>
              Join a team
            </MarginButton>
            <MarginButton onClick={() => setView(TeamView.CreateTeam)}>
              Create a team
            </MarginButton>
          </Flex>
        </Info>
      </>
    );
  }

  return <></>;
};

const Header = styled.div``;

const Info = styled.p`
  font-size: 18px;
  display: block;
  margin: 0 auto;
`;

const BlueButton = styled(Button)`
  background: #4a96f0;
`;

const MarginButton = styled(BlueButton)`
  margin: 10px 15%;
`;

export default TeamWidget;

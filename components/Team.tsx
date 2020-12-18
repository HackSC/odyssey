import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Router from "next/router";

import { Flex, Column, Button, Form, FormGroup } from "../styles";

type Props = {
  team: Team;
  profile: Profile;
};

const Team = ({ team, profile }: Props) => {
  const [error, setError] = useState(null);
  const [visible, setVisibility] = useState(team.lookingForTeammates);
  const [text, setText] = useState(team.description);

  const handleLeaveTeam = useCallback(async () => {
    const confirm = window.confirm("Are you sure you want to leave this team?");

    if (!confirm) {
      return;
    }

    const res = await fetch("/api/team/leave", { method: "POST" });
    const data = await res.json();

    if (res.status === 200) {
      setError(null);
      await Router.push("/team?left");
      window.scrollTo(0, 0);
    } else {
      setError(data.message);
    }
  }, []);

  const handleDeleteTeam = useCallback(async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this team?"
    );

    if (!confirm) {
      return;
    }

    const res = await fetch("/api/team", { method: "DELETE" });
    const data = await res.json();

    if (res.status === 200) {
      setError(null);
      await Router.push("/team?deleted");
      window.scrollTo(0, 0);
    } else {
      setError(data.message);
    }
  }, []);

  const handleKick = useCallback(async member => {
    const confirm = window.confirm(
      `Are you sure you want to kick ${member.firstName} ${member.lastName}, ${member.email}?`
    );

    if (!confirm) {
      return;
    }

    const res = await fetch("/api/team/kick/" + member.userId, {
      method: "POST"
    });
    const data = await res.json();

    if (res.status === 200) {
      setError(null);
      await Router.push("/team");
      window.scrollTo(0, 0);
    } else {
      setError(data.message);
    }
  }, []);

  const handleChangeVisibility = useCallback(async () => {
    setVisibility(!visible);
    const urlRoute = "/api/team/visibility/";

    const result = await fetch(urlRoute, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    });
    return result.status === 200;
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const onSubmit = useCallback(async (text: string) => {
    const urlRoute = "/api/team/description/";

    const result = await fetch(urlRoute, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        teamCode: team.teamCode,
      }),
    });
    return result.status === 200;

  }, []);

  return (
    <TeamSection>
      <Flex direction="row" tabletVertical justify="space-between" >
        <Column flexBasis={48}>
          <h1>{team.name}</h1>

          <TeamCodeBoxFlex direction="row" tabletVertical align="center">
            <h2>Team Code</h2>
            <TeamCodeBox type="text" value={team.teamCode} readOnly />
          </TeamCodeBoxFlex>

          <p>
            Share this code to your friends so they can sign-up to be a part of
            your team.
          </p>
        </Column>

        <Column flexBasis={48}>
          <MembersHeader>Team Members</MembersHeader>
          <Members>
            {team.HackerProfiles.map((member: any) => (
              <Member key={member.email}>
                <PaddedP>
                  <b>
                    {member.firstName && member.lastName
                      ? member.firstName + " " + member.lastName
                      : "No Name"}{" "}
                  </b>
                  ({member.email}
                  {member.userId === team.ownerId && ", Team Owner"})
                  <br />
                  <MemberStatus>{member.status}</MemberStatus>
                </PaddedP>
                {profile.userId === team.ownerId ? (
                  <KickButton onClick={() => handleKick(member)}>
                    Kick
                  </KickButton>
                ) : (
                  <></>
                )}
              </Member>
            ))}
          </Members>

          {profile.userId === team.ownerId ? (
            <LeaveOrDeleteButton onClick={handleDeleteTeam}>
              Delete Team
            </LeaveOrDeleteButton>
          ) : (
            <LeaveOrDeleteButton onClick={handleLeaveTeam}>
              Leave Team
            </LeaveOrDeleteButton>
          )}

          {!!error && <ErrorMessage>{error}</ErrorMessage>}
        </Column>
      </Flex>
      <Flex direction="row" tabletVertical justify="space-between">
        <Column flexBasis={48}>
          <Header>Edit Team Visibility</Header>
          <ChangeProfileOption>
            <input
              name="visibility"
              type="checkbox"
              checked={visible}
              onChange={handleChangeVisibility}
            />
            <ShareProfileText>
              Share the team name and description with hackers looking for teams!
            </ShareProfileText>
          </ChangeProfileOption>
        </Column>
        <Column flexBasis={48}>
          <Header>Edit Team Description</Header>
          <Form>
            <FormGroup>
              <label>Displayed to potential hackers</label>
              <InputFlex>
                <input
                  type="text"
                  placeholder=""
                  value={text}
                  required
                  onChange={handleChange}
                />
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmit(text);
                    setText(text);
                  }}
                >
                  Save
                </Button>
              </InputFlex>
            </FormGroup>
          </Form>
        </Column>
      </Flex>
    </TeamSection>
  );
};

const PaddedP = styled.p`
  padding-right: 3rem;
`;

const KickButton = styled(Button)`
  margin: auto;
  min-width: 150px;
  align-self: end;
`;

const TeamSection = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 48px;
  margin-bottom: 64px;
`;

const TeamCodeBoxFlex = styled(Flex)`
  text-align: center;
  margin-bottom: 16px;

  h2 {
    padding: 0;
    flex: 1;
  }
`;

const TeamCodeBox = styled.input`
  border-radius: 8px;
  border: 1px solid #b2b2b2;
  padding: 12px 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.black};
  font-size: 28px;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  flex: 1;
`;

const MembersHeader = styled.h2`
  padding-bottom: 8px;
`;

const Members = styled.ul`
  list-style: none;
`;

const Member = styled.li`
  display: flex;
  flex-direction: row;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
`;

const MemberStatus = styled.span`
  display: inline-block;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
`;

const LeaveOrDeleteButton = styled(Button)`
  margin-top: 16px;
  align-self: end;
`;

const ErrorMessage = styled.p`
  padding: 16px;
  border: 2px solid ${({ theme }) => theme.colors.peach};
  font-weight: 600;
  border-radius: 8px;
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.peach};
  text-align: center;
`;

const Header = styled.h2`
  padding-bottom: 8px;
  padding-top: 40px;
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

const InputFlex = styled(Flex)`
  input {
    flex-basis: 70%;
    margin-right: 16px;
  }
`;

export default Team;

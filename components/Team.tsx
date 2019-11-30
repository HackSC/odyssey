import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Router from "next/router";

import { Flex, Column, Button } from "../styles";

type Props = {
  team: Team;
  profile: Profile;
};

const Team = ({ team, profile }: Props) => {
  const [error, setError] = useState(null);

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

  return (
    <TeamSection>
      <Flex direction="row" tabletVertical justify="space-between">
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
                <p>
                  <b>
                    {member.firstName && member.lastName
                      ? member.firstName + " " + member.lastName
                      : "No Name"}{" "}
                  </b>
                  ({member.email}
                  {member.userId === team.ownerId && ", Team Owner"})
                  <br />
                  <MemberStatus>{member.status}</MemberStatus>
                </p>
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
    </TeamSection>
  );
};

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

export default Team;

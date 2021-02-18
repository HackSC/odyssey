import React, { useState, useCallback, useRef } from "react";

import styled from "styled-components";
import Select from "react-select";
import { Flex, Column, Button, Form, FormGroup } from "@/styles";
import { TeamView } from "../team";

const CurrentTeam = ({
  setView,
  team,
  profile,
}: {
  setView: Function;
  team: Team;
  profile: Profile;
}) => {
  const teamCodeRef = useRef(null);

  const [error, setError] = useState(null);

  const handleLeaveTeam = useCallback(async () => {
    const confirm = window.confirm("Are you sure you want to leave this team?");

    if (!confirm) {
      return;
    }

    const res = await fetch("/api/team/leave", { method: "POST" });
    const data = await res.json();

    if (res.status === 200) {
      window.location.reload();
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
      window.location.reload();
    } else {
      setError(data.message);
    }
  }, []);

  const handleKick = useCallback(async (member) => {
    const confirm = window.confirm(
      `Are you sure you want to kick ${member.firstName} ${member.lastName}, ${member.email}?`
    );

    if (!confirm) {
      return;
    }

    const res = await fetch("/api/team/kick/" + member.userId, {
      method: "POST",
    });
    const data = await res.json();

    if (res.status === 200) {
      window.location.reload();
    } else {
      setError(data.message);
    }
  }, []);

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
    <>
      <Flex direction="row" tabletVertical justify="space-between">
        <Column flexBasis={52}>
          <h1 style={{ marginBottom: 24 }}>{team.name}</h1>

          <TeamCodeBoxFlex direction="row" tabletVertical align="center">
            <h2>Team Code</h2>
            <TeamCodeBox type="text" value={team.teamCode} readOnly />
          </TeamCodeBoxFlex>

          <p>
            Share this code with your friends so they can sign-up to your team.
            Maximum of 4 members.
          </p>
          <DescriptionHeader>Submit Project</DescriptionHeader>
          <label>
            In addition to submitting on{" "}
            <a href="https://hacksc2021.devpost.com/">Devpost</a>, be sure to
            fill out this form:{" "}
          </label>
          <a
            href="https://forms.gle/ZppYN6RB3UbQsgK69"
            target="_blank"
            rel="noreferrer"
          >
            <Button style={{ marginTop: 8 }}>Access Submission Form</Button>
          </a>
        </Column>

        <Column flexBasis={38}>
          <MembersHeader>Team Members</MembersHeader>
          <Members>
            {team.members.map((member: Profile) => (
              <Member key={member.email}>
                <ProfilePic
                  src={
                    member.profilePic
                      ? member.profilePic
                      : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
                  }
                />
                <PaddedP>
                  <b>
                    {member.firstName && member.lastName
                      ? member.firstName + " " + member.lastName
                      : "No Name"}{" "}
                  </b>
                  ({member.email}
                  {member.userId === team.ownerId && ", Team Owner"})
                  <br />
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
    </>
  );
};

const DescriptionInput = styled.input`
  padding: 8px;
  margin-bottom: 8px;
`;

const PaddedP = styled.p`
  padding-right: 1rem;
  padding-left: 0.5rem;
`;

const KickButton = styled(Button)`
  margin: auto;
  min-width: 75px;
  align-self: end;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
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
  font-weight: 300;
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
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
  overflow-y: auto;
  max-height: 200px;
  overflow-x: hidden;
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

const DescriptionHeader = styled.h2`
  margin-top: 30px;
`;

const Header = styled.h2``;

const ChangeProfileOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
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

export default CurrentTeam;

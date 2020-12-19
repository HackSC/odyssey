import React, { useCallback, useState } from "react";
import styled from "styled-components";
import LinkedIn from "../assets/linkedin.svg";
import Router from "next/router";

const TeammateSuggestions = ({ title, hackers, owner, teamId }) => {
  return (
    <>
      <Title>{title}</Title>
      <Suggestions>
        {hackers.hackerProfiles.length ? (
          <>
            {hackers.hackerProfiles.map((suggestion) => (
              <>
                {suggestion.firstName ? (
                  <Suggestion
                    key={suggestion.userId}
                    title={title}
                    suggestion={suggestion}
                    owner={owner}
                    teamId={teamId}
                  />
                ) : (
                  <div />
                )}
              </>
            ))}
          </>
        ) : (
          <ErrorMsg>No {title}. Check back later!</ErrorMsg>
        )}
      </Suggestions>
    </>
  );
};

const Suggestion = ({ title, suggestion, owner, teamId }) => {
  const [visible, setVisible] = useState(true);

  const handleInviteHackerToTeam = useCallback(async (hackerId, teamId) => {
    const urlRoute = "/api/teamMatching/inviteToTeam/";
    const result = await fetch(urlRoute, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        hackerId: hackerId,
        teamCode: teamId,
      }),
    });
    if (result.status === 200) {
      await Router.push("/team");
    }
  }, []);

  return (
    <>
      {visible ? (
        <Square key={suggestion.userId}>
          {suggestion.portfolioUrl ? (
            <Header>
              <PortfolioLink>
                <a href={suggestion.portfolioUrl} target="_blank">
                  <img src={LinkedIn} />
                </a>
              </PortfolioLink>
              <NameHeader>
                <Name>
                  {suggestion.firstName} {suggestion.lastName}
                </Name>
                <Subheading>
                  {suggestion.year ? suggestion.year : "year unavailable"}
                </Subheading>
              </NameHeader>
            </Header>
          ) : (
            <NameHeader>
              <Name>
                {suggestion.firstName} {suggestion.lastName}
              </Name>
              <Subheading>
                {suggestion.year ? suggestion.year : "year unavailable"}
              </Subheading>
            </NameHeader>
          )}

          <Subheading>
            {suggestion.major ? suggestion.major : "major unavailable"}
          </Subheading>

          <SkillHeading>Top Skills:</SkillHeading>
          <Skills>
            {suggestion.skills ? suggestion.skills : "not available"}
          </Skills>
          <School>
            {suggestion.school ? suggestion.school : "school unavailable"}
          </School>
          {title !== "Pending Teammate Invites" ? (
            <Menu>
              <Message href={"mailto:" + suggestion.email}>Message</Message>
              {owner === "team" ? (
                <MenuOption
                  onClick={() => {
                    setVisible(!visible);
                    handleInviteHackerToTeam(suggestion.userId, teamId);
                  }}
                >
                  Invite
                </MenuOption>
              ) : (
                <div />
              )}
            </Menu>
          ) : (
            <div />
          )}
        </Square>
      ) : (
        <div />
      )}
    </>
  );
};

const Title = styled.h2`
  padding-bottom: 0;
  padding-top: 30px;
`;

const Suggestions = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Square = styled.div`
  margin: 20px;
  width: 175px;
  height: 175px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #b7b7b7;
  border-radius: 20px;
  background: #ffffff;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
`;

const PortfolioLink = styled.div`
  padding-right: 10px;
`;

const NameHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: 700;
  font-size: 16px;
  text-align: center;
`;

const Subheading = styled.div`
  font-weight: 400;
  font-size: 16px;
  align-self: center;
  text-align: center;
`;

const SkillHeading = styled.div`
  font-weight: 700;
  font-size: 14px;
  align-self: flex-start;
`;

const Skills = styled.div`
  font-weight: 400;
  font-size: 14px;
  align-self: flex-start;
  max-width: 155px;
  max-height: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const School = styled.div`
  font-weight: 400;
  font-size: 14px;
  align-self: flex-start;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MenuOption = styled.button`
  padding: 6px 12px 6px 12px;
  background: rgba(255, 131, 121, 0.85);
  border-radius: 20px;
  border: none;
  color: white;
  font-weight: 600;
  margin-left: 20px;
`;

const Message = styled.a`
  color: white;
  padding: 6px 12px 6px 12px;
  background: rgba(255, 131, 121, 0.85);
  border-radius: 20px;
  border: none;
  color: white;
  font-weight: 600;
`;

const ErrorMsg = styled.div`
  padding-top: 10px;
`;

export default TeammateSuggestions;

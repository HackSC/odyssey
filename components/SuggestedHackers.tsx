import React, { useCallback, useState } from "react";
import styled from "styled-components";
import LinkedIn from "../assets/linkedin.svg";

const SuggestedHackers = ({ hackers, type }) => {
  return (
    <>
      <Suggestions>
        {hackers != null && hackers.hackerProfiles.length ? (
          <>
            {hackers.hackerProfiles.map((suggestion) => (
              <div key={Object.entries(suggestion).toString()}>
                {suggestion.firstName ? (
                  <Suggestion
                    suggestion={suggestion}
                    id={Object.entries(suggestion).toString()}
                    type={type}
                  />
                ) : (
                  <div />
                )}
              </div>
            ))}
          </>
        ) : (
          <ErrorMsg>No suggestions. Check back later!</ErrorMsg>
        )}
      </Suggestions>
    </>
  );
};

const Suggestion = ({ suggestion, id, type }) => {
  const [visible, setVisible] = useState(true);

  return (
    <div key={id}>
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
          <Menu>
            <Message style={{backgroundColor: type}} href={"mailto:" + suggestion.email}>Message</Message>
          </Menu>
        </Square>
      ) : (
        <div />
      )}
    </div>
  );
};

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
  margin-left: 10px;
  font-size: 14px;
`;

const Message = styled.a`
  color: white;
  padding: 6px 12px 6px 12px;
  background: rgba(255, 131, 121, 0.85);
  border-radius: 20px;
  border: none;
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

const ErrorMsg = styled.div`
  padding-top: 10px;
`;

export default SuggestedHackers;

import React, { useCallback, useState } from "react";
import styled from "styled-components";

const TeamSuggestions = ({ type, handleOnClick, teamSuggestions, buttonLabel }) => {
  return (
    <>
      <Title>{type}</Title>
      <Suggestions>
          {teamSuggestions.map((suggestion) => (
              <Suggestion key={suggestion.id}>
                  <Name>
                      {suggestion.name}
                  </Name>
                  {type !== "Your Pending Requests" ? (
                    <>
                      <Description>
                          {suggestion.description}
                      </Description>
                      <Menu>
                      {type === "Team Suggestions" ?
                          (<MenuOption onClick={() => handleOnClick(suggestion.id)}>{buttonLabel}</MenuOption>) :
                          (<MenuOption onClick={() => handleOnClick(suggestion.name)}>{buttonLabel}</MenuOption>)
                      }
                      </Menu>
                    </>
                  ) : (
                    <LongDescription>
                          {suggestion.description}
                    </LongDescription>
                  )}
              </Suggestion>
          ))}
      </Suggestions>
    </>
  )
};

const Title = styled.h2`
  padding-top: 30px;
  padding-bottom: 0;
`;

const Suggestions = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Suggestion = styled.div`
  margin: 20px;
  width: 175px;
  height: 175px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #B7B7B7;
  border-radius: 20px;
  background: #FFFFFF;
`;

const Name = styled.div`
  font-weight: 700;
  font-size: 16px;
  text-align: center;
`;

const Description = styled.div`
  font-weight: 400;
  font-size: 16px;
  align-self: flex-start;
  height: 115px;
  overflow-y: scroll;
`;

const LongDescription = styled.div`
  font-weight: 400;
  font-size: 16px;
  align-self: flex-start;
  height: 150px;
  overflow-y: scroll;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
`;

const MenuOption = styled.button`
  padding: 6px 12px 6px 12px;
  background: rgba(255, 131, 121, 0.85);
  border-radius: 20px;
  border: none;
  color: white;
  font-weight: 600;
`;

export default TeamSuggestions;

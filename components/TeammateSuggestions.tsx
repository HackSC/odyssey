import React, { useCallback, useState } from "react";
import styled from "styled-components";

// do a get request instead of example suggestions
const exampleSuggestions = [
    {
        name: "Max",
    },
    {
        name: "Andreas",
    },
    {
        name: "Katie",
    },
]

const TeammateSuggestions = () => (
    <Suggestions>
      <Title>Teammate Suggestions</Title>
      {exampleSuggestions.map(suggestion => (
          <Suggestion>
              <Name>{suggestion.name}</Name>
              <Menu>
                  <MenuOption>Invite to Team</MenuOption>
                  <MenuOption>Request to Join Their Team</MenuOption>
              </Menu>
          </Suggestion>
      ))}
    </Suggestions>
);

const Title = styled.h2`
  padding-bottom: 0;
`;

const Suggestions = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
`;

const Suggestion = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-style: solid;
  border-width: 0.5px;
  border-color: black;
`;

const Name = styled.div`
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
`;

const MenuOption = styled.button`
  padding: 4px;
  margin-left: 10px;
`;

export default TeammateSuggestions;

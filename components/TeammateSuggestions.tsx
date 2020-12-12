import React, { useCallback, useState } from "react";
import styled from "styled-components";

// do a get request instead of example suggestions
// is there more info on the hacker we want to add?
// what's the difference between invite to team and request to join team? And how do they know which to select?
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
];

const TeammateSuggestions = ({ teammateSuggestions }) => {
  console.log(teammateSuggestions);
  return (
    <Suggestions>
      <Title>Teammate Suggestions</Title>
      {teammateSuggestions.hackerProfiles.map((suggestion) => (
        <Suggestion>
          <Name>
            {suggestion.firstName} {suggestion.lastName}
          </Name>
          <Menu>
            <MenuOption>Invite to Team</MenuOption>
          </Menu>
        </Suggestion>
      ))}
    </Suggestions>
  );
};

// TeammateSuggestions.getInitialProps = async ({ req }) => {
//   console.log("called getInitial");
//   const profile = await getProfile(req);

//   console.log(profile);
//   console.log("HERE");
//   // Fetch teammate suggestions
//   // const res = await fetch("/api/teamMatching", {
//   //   method: "GET",
//   //   body: JSON.stringify({
//   //     user: profile,
//   //   }),
//   //   headers: {
//   //     "Content-Type": "application/json"
//   //   }
//   // });

//   // const data = await res.json();

//   return {
//     teammateSuggestions: [],
//     profile: profile,
//   };
// };

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

const Name = styled.div``;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
`;

const MenuOption = styled.button`
  padding: 4px;
  margin-left: 10px;
`;

export default TeammateSuggestions;

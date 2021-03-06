import React, { useState, useCallback, useRef } from "react";

import styled from "styled-components";
import { Form, FormGroup, Flex, Button } from "@/styles";

import { TeamView } from "../team";

const CreateTeamTab = ({ setView }: { setView: Function }) => {
  const teamNameRef = useRef(null);
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (teamNameRef && teamNameRef.current) {
        const name = teamNameRef.current.value.trim();

        if (!error) {
          // Attempt to join a team
          const res = await fetch("/api/team", {
            method: "POST",
            body: JSON.stringify({
              name,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await res.json();

          if (res.status === 200) {
            setError(null);
            window.location.reload();
          } else {
            setError(data.message);
          }
        }
      }
    },
    [error, teamNameRef]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create a Team</h2>

      <FormGroup>
        <label>Enter a Team Name</label>

        <InputFlex>
          <input
            type="text"
            placeholder="Your Team Name"
            name="team-name"
            maxLength={150}
            required
            ref={teamNameRef}
          />

          <BlueButton type="submit">Create</BlueButton>
        </InputFlex>

        {!!error && <ErrorMessage>{error}</ErrorMessage>}
      </FormGroup>

      <BlueButton type="button" onClick={() => setView(TeamView.NoTeam)}>
        &#171; Back
      </BlueButton>
    </Form>
  );
};

const BlueButton = styled(Button)`
  background: #4a96f0;
`;

const InputFlex = styled(Flex)`
  input {
    flex-basis: 70%;
    margin-right: 16px;
  }
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

export default CreateTeamTab;

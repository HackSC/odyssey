import React, { useState, useCallback, useRef } from "react";

import styled from "styled-components";
import Router from "next/router";

import { Form, FormGroup, Flex, Button } from "@/styles";
import { TeamView } from "../team";

const JoinTeamForm = ({ setView }: { setView: Function }) => {
  const teamCodeRef = useRef(null);

  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);

  const handleJoinClick = useCallback(async (e) => {
    e.preventDefault();

    if (teamCodeRef && teamCodeRef.current) {
      const code = teamCodeRef.current.value.toUpperCase();

      const res = await fetch("/api/team/" + code);
      const data = await res.json();
      if (res.status === 200) {
        setTeam(data.team);
        setError(null);
      } else {
        setTeam(null);
        setError(data.message);
      }
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!error && team) {
        // Attempt to join a team
        const res = await fetch("/api/team/join/" + team.teamCode, {
          method: "POST",
          body: "",
          credentials: "include",
        });

        const data = await res.json();

        if (res.status === 200) {
          window.location.reload();
        } else {
          setError(data.message);
        }
      }
    },
    [error, team]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Title>Join a Team</Title>
      <FormGroup>
        <label>Enter a Team Code</label>

        <InputFlex>
          <input
            type="text"
            placeholder="ABCD"
            name="team-code"
            maxLength={4}
            required
            ref={teamCodeRef}
          />

          <BlueButton onClick={handleJoinClick}>Join</BlueButton>
        </InputFlex>

        {!!team && (
          <>
            <Details direction="column">
              <h3>Team Details</h3>

              <p>
                <b>Name:</b> {team.name}
              </p>
            </Details>

            <BlueButton type="submit">Confirm</BlueButton>
          </>
        )}

        {!!error && <ErrorMessage>{error}</ErrorMessage>}
      </FormGroup>

      <BlueButton type="button" onClick={() => setView(TeamView.NoTeam)}>
        &#171; Back
      </BlueButton>
    </Form>
  );
};

const InputFlex = styled(Flex)`
  input {
    flex-basis: 70%;
    margin-right: 16px;
  }
`;

const Title = styled.h2`
  padding-bottom: 0;
`;

const Details = styled(Flex)`
  padding: 16px 0;
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

const BlueButton = styled(Button)`
  background: #4a96f0;
`;

export default JoinTeamForm;

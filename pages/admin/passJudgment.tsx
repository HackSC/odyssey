import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { handleLoginRedirect, getProfile, getJudgeList } from "../../lib";
import { Head, Navbar, Footer } from "../../components";
import { Background, Container, Button, Flex, Column } from "../../styles";

const passJudgment = ({ judgeList }) => {
  useEffect(() => {
    console.log(judgeList);
  }, []);

  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn admin activePage="/judgingManager" />
      <Background padding="2rem">
        <Container>
          <PaddedTitle>Pass Judgment</PaddedTitle>
          <Flex
            direction="row"
            justify="space-between"
            style={{ flexWrap: "wrap" }}
          >
            <Column flexBasis={30}>
              <Flex direction="column" style={{ flexWrap: "wrap" }}>
                <TimeCard primary>
                  <TimeCardLabel>Time</TimeCardLabel>
                  <TimeCardTeamName>Team 1</TimeCardTeamName>
                  <TimeCardTeamList>List of team members</TimeCardTeamList>
                  <TimeCardLink>Link to slack room or zoom call</TimeCardLink>
                </TimeCard>
                <TimeCard>
                  <TimeCardLabel>Time</TimeCardLabel>
                  <TimeCardTeamName>Team 1</TimeCardTeamName>
                  <TimeCardTeamList>List of team members</TimeCardTeamList>
                  <TimeCardLink>Link to slack room or zoom call</TimeCardLink>
                </TimeCard>
                <TimeCard>
                  <TimeCardLabel>Time</TimeCardLabel>
                  <TimeCardTeamName>Team 1</TimeCardTeamName>
                  <TimeCardTeamList>List of team members</TimeCardTeamList>
                  <TimeCardLink>Link to slack room or zoom call</TimeCardLink>
                </TimeCard>
                <TimeCard>
                  <TimeCardLabel>Time</TimeCardLabel>
                  <TimeCardTeamName>Team 1</TimeCardTeamName>
                  <TimeCardTeamList>List of team members</TimeCardTeamList>
                  <TimeCardLink>Link to slack room or zoom call</TimeCardLink>
                </TimeCard>
              </Flex>
            </Column>
            <Column flexBasis={65}>
              <Cell style={{ padding: "20px" }}>
                <JudgeField>
                  <JudgeFieldLabel>Vertical</JudgeFieldLabel>
                  <JudgeFieldSelectInput
                    placeholder="Vertical"
                    id="verticalSelect"
                  >
                    <option value="person">Person</option>
                    <option value="team">Team</option>
                    <option value="customer">Customer</option>
                    <option value="device">Device</option>
                  </JudgeFieldSelectInput>
                </JudgeField>
                <JudgeField>
                  <JudgeFieldLabel>Sponsor</JudgeFieldLabel>
                  <JudgeFieldSelectInput placeholder="Sponsor">
                    <option value="sponsor1">Sponsor 1</option>
                    <option value="sponsor2">Sponsor 2</option>
                  </JudgeFieldSelectInput>
                </JudgeField>
                <JudgeField>
                  <JudgeFieldLabel>Notes</JudgeFieldLabel>
                  <JudgeFieldTextArea placeholder="Write notes here..."></JudgeFieldTextArea>
                </JudgeField>
                <JudgeField>
                  <JudgeFieldLabel>Score</JudgeFieldLabel>
                  <JudgeFieldSelectInput placeholder="Score" id="scoreSelect">
                    {[...new Array(11).keys()].map((i) => (
                      <option key={`${i}`} value={`${i}`}>
                        {i}
                      </option>
                    ))}
                  </JudgeFieldSelectInput>
                  <p style={{ marginTop: "4px", fontSize: "14px" }}>
                    For unsubmitted projects and/or judging mishaps, enter a
                    score of 0 and hit up engineering slack channel:
                    #2021-engineering.
                  </p>
                </JudgeField>
                <FullButton>Submit</FullButton>
              </Cell>
            </Column>
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

passJudgment.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  console.log("fetching judge list");
  const judgeList = await getJudgeList(req);

  console.log(judgeList);
  // Null profile means user is not logged in or user does not have enough rights
  if (
    !profile ||
    !(
      profile.role == "admin" ||
      profile.role == "judge" ||
      profile.role == "superadmin"
    )
  ) {
    handleLoginRedirect(req);
  }

  return { judgeList };
};

const PaddedTitle = styled.h1`
  padding: 1rem 0 2rem 0;
`;

const Cell = styled.div`
  display: inline-block;
  padding: 10px 20px;
  margin: 5px 5px;
  background: #ffffff;
  border-radius: 8px;
  font-size: 16px;
`;

const SmallCell = styled.div`
  padding: 12px 1px;
  margin: 0px 1px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #b2b2b2;
  min-width: 39px;
  display: inline-block;
  text-align: center;
  font-size: 16px;
`;

const Input = styled.input`
  border-radius: 8px;
  border: 1px solid #b2b2b2;
  padding: 12px 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

const FullButton = styled(Button)`
  width: 100%;
  text-align: center;
`;

type TimeCardType = {
  primary?: boolean;
};

const TimeCard = styled.div<TimeCardType>`
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  border: 2px solid;
  border-color: ${(props) => (props.primary ? "#FF8379" : "white")};
`;

const TimeCardLabel = styled.label`
  margin-bottom: 20px;
  color: #757575;
  font-weight: 600;
  font-size: 16px;
  text-indent: 1em;
  &::before {
    content: "🕐 ";
    padding-right: 4px;
  }
`;

const TimeCardTeamName = styled.h2`
  margin-bottom: 16px;
  margin-top: 12px;
  padding: 0;
`;

const TimeCardTeamList = styled.p`
  margin-bottom: 8px;
  font-size: 18px;
`;

const TimeCardLink = styled.a`
  font-size: 16px;
`;

const JudgeField = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const JudgeFieldLabel = styled.label`
  display: block;
  margin-bottom: 4px;
`;

const JudgeFieldTextInput = styled.input`
  width: 100%;
  padding: 10px 0px 10px 10px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  border: 2px solid #e5e5e5;
  border-radius: 4px;
  font-size: 16px;
`;

const JudgeFieldTextArea = styled.textarea`
  width: 100%;
  padding: 10px 0px 10px 10px;
  box-sizing: border-box;
  background-color: #f8f8f8;
  border: 2px solid #e5e5e5;
  border-radius: 4px;
  height: 150px;
  font-size: 16px;
  font-family: Arial;
`;

const JudgeFieldSelectInput = styled.select`
  width: 100%;
  padding: 10px 0px 10px 10px;
  background-color: #f8f8f8;
  border: 2px solid #e5e5e5;
  border-radius: 4px;
  font-size: 16px;
`;

export default passJudgment;

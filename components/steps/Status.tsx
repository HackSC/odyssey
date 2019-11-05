import * as React from "react";
import styled from "styled-components";
import Router from "next/router";
import * as Sentry from "@sentry/browser";

import getProfileStage from "../../lib/getProfileStage";

import { Flex, Column, Button } from "../../styles";

import Check from "../../assets/check.svg";

type Props = {
  profile: Profile;
};

const getStatusLabel = (status: string) => {
  if (!status || status === "unverified") {
    return "Unverified";
  }
  if (status === "checkedIn") return "Checked In";

  return status[0].toUpperCase() + status.substring(1, status.length);
};

const getStage = (profile: Profile): number => {
  if (profile.status === "unverified") {
    return 1;
  } else if (profile.status === "verified") {
    if (profile.submittedAt !== null) {
      Sentry.captureMessage(
        "Status = verified but should actually be submitted!!!"
      );
      return 3;
    }

    return 2;
  }
  return 3;
};

const navigateTo = (step: string): void => {
  Router.push(`/${step}`);
};

const StatusStep: React.FunctionComponent<Props> = props => {
  const { profile } = props;
  const { status } = profile;

  const statusLabel = getStatusLabel(status);

  return (
    <Flex direction="column">
      <h1>Hey there!</h1>

      <Status align="center" justify="space-between">
        <Flex direction="row" align="center">
          <img src={Check} alt="Check" />
          <h2>Status</h2>
        </Flex>

        <Label>{statusLabel}</Label>
      </Status>

      <Flex justify="space-between" tabletVertical>
        <Column flexBasis={63}>
          <h2>Next Steps</h2>
          <Steps>
            <Step disabled={getStage(profile) > 1}>
              <h3>1. Verify your e-mail</h3>
              <p>
                Make sure to check your e-mail and verify your account. If you
                run into issues, log-out and log back in.
              </p>
            </Step>
            <Step disabled={getStage(profile) > 2}>
              <h3>2. Fill out an application</h3>
              <p>
                Answer a few questions to show why you want to be at HackSC
                2020!
              </p>

              {getStage(profile) === 2 && (
                <StepButton onClick={() => navigateTo("application")}>
                  Fill out application
                </StepButton>
              )}
            </Step>
            <Step>
              <h3>3. View Results</h3>
              <p>Come back soon and see your results.</p>
              {getStage(profile) === 3 && (
                <StepButton onClick={() => navigateTo("results")}>
                  View Results
                </StepButton>
              )}
            </Step>
          </Steps>
        </Column>

        <DatesColumn flexBasis={35}>
          <h2>Major Dates</h2>

          <Dates>
            <Date>
              <h3>Applications Open</h3>
              <p>November 1st, 2019</p>
            </Date>

            <Date>
              <h3>Applications Close</h3>
              <p>November 22nd, 2019</p>
            </Date>

            <Date>
              <h3>HackSC 2020</h3>
              <p>January 31, 2020</p>
            </Date>
          </Dates>
        </DatesColumn>
      </Flex>
    </Flex>
  );
};

const Status = styled(Flex)`
  padding: 48px;
  margin: 16px 0 32px;
  background: #ffffff;
  border-radius: 4px;

  h2 {
    padding: 0;
    margin-left: 16px;
  }

  ${({ theme }) =>
    theme.media.tablet`
      padding: 32px;
    `}
`;

const DatesColumn = styled(Column)`
  ${({ theme }) =>
    theme.media.tablet`
      margin-top: 32px;
    `}
`;

const Label = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 600;
`;

const Steps = styled.div`
  margin-top: 12px;
`;

type StepProps = {
  disabled?: boolean;
};

const Step = styled.div<StepProps>`
  padding: 24px 36px;
  margin-bottom: 24px;
  background: #ffffff;
  border-radius: 4px;

  &:last-child {
    margin-bottom: 0;
  }

  ${({ disabled }) => disabled && `opacity: 0.25;`}
`;

const StepButton = styled(Button)`
  margin-top: 24px;
`;

const Dates = styled.div`
  padding: 24px 36px;
  margin: 16px 0 32px;
  background: #ffffff;
  border-radius: 4px;
`;

const Date = styled.div`
  margin-top: 36px;

  :first-child {
    margin-top: 0;
  }

  h3 {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.peach};
    padding-bottom: 4px;
  }
`;

export default StatusStep;

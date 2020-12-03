import * as React from "react";
import styled from "styled-components";
import Router from "next/router";
import * as Sentry from "@sentry/browser";
import Link from "next/link";

import { useIsMobile } from "../../lib/layouts";

import { Flex, Column, Button } from "../../styles";

import Check from "../../assets/check.svg";
import GreenCheck from "../../assets/green_check.svg";
import RedCheck from "../../assets/red_check.svg";

type Props = {
  profile: Profile;
  socialPosts: any;
};

const getStatusLabel = (profile: Profile): string => {
  const { status, submittedAt } = profile
    ? profile
    : { status: null, submittedAt: null };
  if (!status || status === "unverified") {
    return "Unverified";
  }
  if (status === "checkedIn") return "Checked In";
  if (status === "verified" && !!submittedAt) {
    return "Submitted";
  }

  return status[0].toUpperCase() + status.substring(1, status.length);
};

const getStage = (profile: Profile): number => {
  const { status, submittedAt } = profile;
  if (status === "unverified") {
    return 1;
  } else if (status === "verified") {
    if (!!submittedAt) {
      Sentry.captureMessage(
        "Status = verified but should actually be submitted!!!"
      );
      return 3;
    }

    return 2;
  } else if (status === "confirmed" || status === "declined") {
    return 4;
  }

  return 3;
};

const navigateTo = async (step: string) => {
  await Router.push(`/${step}`);
  window.scrollTo(0, 0);
};

const getCheck = (profile: Profile) => {
  const { status } = profile;

  if (status === "accepted" || status === "confirmed") {
    return <img src={GreenCheck} alt="Green Check" />;
  } else if (status === "rejected" || status === "declined") {
    return <img src={RedCheck} alt="Red Check" />;
  } else {
    return <img src={Check} alt="Check" />;
  }
};

const StatusStep: React.FunctionComponent<Props> = (props) => {
  const { profile, socialPosts } = props;

  const statusLabel = getStatusLabel(profile);
  const isMobile = useIsMobile();
  const profileStage = getStage(profile);

  return (
    <Flex direction="column">
      <h1>
        {profile && profile.firstName
          ? `Hey there, ${profile.firstName}!`
          : "Hey there!"}
      </h1>

      <Status>
        <Flex align="center" justify="space-between">
          <Flex direction="row" align="center">
            {getCheck(profile)}

            <h2>Status</h2>
          </Flex>

          <Label>{statusLabel}</Label>
        </Flex>

        {profile && profile.status === "declined" && (
          <StatusMessage>
            We're sad to hear that you will not be attending HackSC 2021.{" "}
            <b>If you would like to un-decline</b>, please do so on{" "}
            <a href="/results">the results page.</a> If you have any additional
            questions or comments, please let us know at{" "}
            <a href="mailto:team@hacksc.com">team@hacksc.com</a>
          </StatusMessage>
        )}

        {profile && profile.status === "confirmed" && (
          <StatusMessage>
            We're excited to have you at HackSC 2021! Be on the lookout for
            future updates and communications from us. If you have any updates
            or questions, please let us know at{" "}
            <a href="mailto:team@hacksc.com">team@hacksc.com</a>
          </StatusMessage>
        )}

        {profile && profile.status === "accepted" && (
          <StatusMessage>
            You have been accepted to HackSC! Just one more step: please confirm
            or decline your attendance by filling out{" "}
            <a href="/results">this short form.</a>
          </StatusMessage>
        )}

        {profile && profile.status === "rejected" && (
          <StatusMessage>
            Thank you for applying to HackSC. Unfortunately, we regret to inform
            you that you have not been accepted to HackSC 2021. While we know
            this isn't the news you'd like to hear, we wish you the best going
            forward.
          </StatusMessage>
        )}
      </Status>

      <Flex justify="space-between" tabletVertical>
        <Column flexBasis={63}>
          <h2>Next Steps</h2>
          <Steps>
            <Step disabled={profileStage !== 1}>
              <h3>1. Verify your e-mail</h3>
              <p>
                Make sure to check your e-mail and verify your account. If
                you've just verified your email,{" "}
                <a
                  href={
                    typeof window !== "undefined" ? window.location.href : ""
                  }
                >
                  click here.
                </a>
              </p>
            </Step>
            <Step disabled={profileStage !== 2}>
              <h3>2. Fill out an application</h3>
              <p>
                Answer a few questions to show why you want to be at HackSC
                2021!
              </p>

              {profileStage == 2 && (
                <StepButton onClick={() => navigateTo("appform")}>
                  Fill out application
                </StepButton>
              )}
            </Step>
            {/* 3 and 4 is awaiting results and received results, respectively*/}
            <Step disabled={profileStage !== 3 && profileStage !== 4}>
              <h3>
                {profile.status === "accepted"
                  ? "3) Confirm Attendance"
                  : "3) View Results"}
              </h3>
              <p>
                {profile.status === "accepted"
                  ? "Congrats, you have been accepted to HackSC 2021. Please confirm/decline your attendance by January 1st"
                  : "Come back soon and see your results."}
              </p>
              {profileStage === 4 && (
                <StepButton onClick={() => navigateTo("results")}>
                  {profile.status === "accepted"
                    ? "Confirm Attendance"
                    : "View Results"}
                </StepButton>
              )}
            </Step>
          </Steps>
        </Column>

        <DatesColumn flexBasis={35}>
          <h2>Major Dates</h2>

          <Dates>
            <DateText>
              <h3>Applications Open</h3>
              <p>December 1st, 2020</p>
            </DateText>

            <DateText>
              <h3>Applications Close</h3>
              <p>December 14th, 2020</p>
            </DateText>

            <DateText>
              <h3>HackSC 2021</h3>
              <p>February 19 - 21, 2021</p>
            </DateText>
          </Dates>
        </DatesColumn>
      </Flex>
    </Flex>
  );
};

type CircleIconProps = {
  size: number;
  bgColor: string;
};

const Status = styled.div`
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

const StatusMessage = styled.p`
  margin-top: 24px;
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
  padding: 24px 24px;
  margin: 16px 0 32px;
  background: #ffffff;
  border-radius: 4px;
`;

const DateText = styled.div`
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

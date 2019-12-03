import * as React from "react";
import styled from "styled-components";
import Router from "next/router";
import * as Sentry from "@sentry/browser";
import copy from "copy-to-clipboard";
import { FaLink, FaFacebookF, FaTwitter, FaEnvelope } from "react-icons/fa";
import { Tooltip } from "react-tippy";
import Link from "next/link";

import { useIsMobile } from "../../lib/layouts";

import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton
} from "react-share";

import { Flex, Column, Button } from "../../styles";

import Check from "../../assets/check.svg";

type Props = {
  profile: Profile;
  socialPosts: any;
};

const getStatusLabel = (profile: Profile): string => {
  const { status, submittedAt } = profile;
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
  }
  return 3;
};

const navigateTo = async (step: string) => {
  await Router.push(`/${step}`);
  window.scrollTo(0, 0);
};

const getDaysTillClose = (): number => {
  const endDate = new Date("Dec 8, 2019, 11:59 PM").getTime();
  const nowDate = new Date().getTime();
  const diff = endDate - nowDate;
  return Math.floor(diff / 1000 / 60 / 60 / 24);
};

const StatusStep: React.FunctionComponent<Props> = props => {
  const { profile, socialPosts } = props;

  const statusLabel = getStatusLabel(profile);
  const isMobile = useIsMobile();

  return (
    <Flex direction="column">
      <Banner>
        <b>NEW: </b> Apply with your friends!{" "}
        <Link href="/team">Click here to join or create a team</Link> to
        indicate that you're applying to HackSC as a team. You'll be able to
        set-up teams until results come out.
      </Banner>

      <h1>
        {profile && profile.firstName
          ? `Hey there, ${profile.firstName}!`
          : "Hey there!"}
      </h1>

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
          <h2>Your Referral Code</h2>
          <ReferralCode>
            <h3>{profile.promoCode}</h3>
            <p>
              This is your code, share it around. The more people who use it the
              more likely you are to get in.
            </p>
            <ReferralButtons>
              <FacebookShareButton {...socialPosts.facebook}>
                <CircleIcon size={20} bgColor="#3b5998">
                  <FaFacebookF color="white" />
                </CircleIcon>
              </FacebookShareButton>
              <TwitterShareButton {...socialPosts.twitter} size={40}>
                <CircleIcon size={20} bgColor="#1dcaff">
                  <FaTwitter color="white" />
                </CircleIcon>
              </TwitterShareButton>
              <EmailShareButton {...socialPosts.email}>
                <CircleIcon size={20} bgColor="#a9a9a9">
                  <FaEnvelope color="white" />
                </CircleIcon>
              </EmailShareButton>
              <Tooltip
                title="Copied link to clipboard!"
                position="bottom"
                duration={3}
                trigger="click"
                inertia
                arrow
              >
                <CircleIcon
                  size={20}
                  bgColor="#ffce00"
                  onClick={() => copy(socialPosts.link)}
                >
                  <FaLink color="white" />
                </CircleIcon>
              </Tooltip>
            </ReferralButtons>
          </ReferralCode>
          <ReferredBoard>
            {isMobile ? (
              <div>
                <h3>Number referred: {profile.referred.length}</h3>
              </div>
            ) : (
              <div>
                <h3> People Referred</h3>
                {profile.referred.length == 0 ? (
                  <p> You haven't referred anyone yet!</p>
                ) : (
                  profile.referred.map(p => <p>{p.email}</p>)
                )}
              </div>
            )}
          </ReferredBoard>

          <Countdown>
            <CountdownHeader>
              <Count>{getDaysTillClose()}</Count>
              <h2>Days to apply!</h2>
            </CountdownHeader>
            <Button
              as="a"
              target="_blank"
              href="http://www.google.com/calendar/event?action=TEMPLATE&dates=20191129T200000Z%2F20191129T210000Z&text=Finish%20HackSC%20Application&location=&details=Reminder%20to%20finish%20HackSC%20Application%20before%20deadline"
            >
              Add to Calendar
            </Button>
          </Countdown>

          <h2>Major Dates</h2>

          <Dates>
            <DateText>
              <h3>Applications Open</h3>
              <p>November 7th, 2019</p>
            </DateText>

            <DateText>
              <h3>Applications Close</h3>
              <p>December 8th, 2019</p>
            </DateText>

            <DateText>
              <h3>HackSC 2020</h3>
              <p>January 31, 2020</p>
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

const CircleIcon = styled.div<CircleIconProps>`
  background: ${props => props.bgColor};
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  text-align: center;
  line-height: ${props => props.size}px;
  vertical-align: middle;
  padding: ${props => props.size - 10}px;

  :hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

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

const ReferralCode = styled.div`
  padding: 24px 24px;
  margin: 0 0 16px;
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
`;

const ReferredBoard = styled.div`
  padding: 18px 24px;
  background: #ffffff;
  border-radius: 4px;
  text-align: left;
  margin: 0 0 16px;
`;

const ReferralButtons = styled.div`
  margin: 0 0 8px;
  border-radius: 4px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  * {
    margin: 2px;
  }
`;

const Countdown = styled.div`
  padding: 24px 36px;
  margin: 0 0 32px;
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Count = styled.h2`
  font-size: 72px;
  color: ${({ theme }) => theme.colors.peach};
`;

const CountdownHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  h2 {
    padding-left: 12px;
    margin-bottom: 0px;
  }
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

const Banner = styled.div`
  padding: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.magenta};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 24px;
  line-height: 22px;

  a {
    color: ${({ theme }) => theme.colors.white};
    text-decoration: underline;
  }
`;

export default StatusStep;

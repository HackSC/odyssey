import * as React from "react";
import styled from "styled-components";
import Router from "next/router";
import * as Sentry from "@sentry/browser";
import Link from "next/link";
import QRCode from "react-qr-code";

import { Flex, Column, Button } from "../../styles";
import Step from "./Status";
import HouseLogo from "../../assets/hackscFox.png";

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
  } else if (status === "confirmed" || status === "declined") {
    return 4;
  }

  return 3;
};

const navigateTo = async (step: string) => {
  await Router.push(`/${step}`);
  window.scrollTo(0, 0);
};

const LiveStep: React.FunctionComponent<Props> = props => {
  const { profile, socialPosts } = props;

  if (profile.status === "confirmed") {
    return (
      <Flex justify="space-between" tabletVertical>
        <Column flexBasis={50}>
          <QRCodeWrapper>
            <QRCode value={profile.userId} />
          </QRCodeWrapper>
        </Column>

        <InstructionsColumn flexBasis={50}>
          <CheckInTitle>Check-In Instructions</CheckInTitle>

          <CheckInInstructions>
            Please show your QR Code to a HackSC volunteer or organizer. This
            will check you into the event and assign you to a house. You cannot
            begin hacking before being checked-in.
          </CheckInInstructions>
        </InstructionsColumn>
      </Flex>
    );
  } else if (profile.status === "checkedIn") {
    return (
      <Flex justify="space-between" tabletVertical>
        <Column flexBasis={40}>
          <QRCodeWrapper>
            <QRCode value={profile.userId} />
          </QRCodeWrapper>
        </Column>

        <InstructionsColumn flexBasis={60}>
          <CheckInTitle>
            {profile && profile.firstName
              ? `Hey there, ${profile.firstName}!`
              : "Hey there!"}
          </CheckInTitle>

          <Flex justify="space-between" tabletVertical>
            <Column flexBasis={50}>
              <CheckInTitle>House</CheckInTitle>
              <Flex justify="space-between" tabletVertical>
                <Column flexBasis={50}>
                  <HouseImg src={HouseLogo} alt="House Logo" />
                </Column>
                <Column flexBasis={50}>
                  <CheckInTitle>Points here</CheckInTitle>
                </Column>
              </Flex>
            </Column>
            <Column flexBasis={50}>
              <CheckInTitle>You</CheckInTitle>
              <Flex justify="space-between" tabletVertical>
                <Column flexBasis={50}>
                  <HouseImg src={HouseLogo} alt="House Logo" />
                </Column>
                <Column flexBasis={50}>
                  <CheckInTitle>Points here</CheckInTitle>
                </Column>
              </Flex>
            </Column>
          </Flex>
        </InstructionsColumn>
      </Flex>
    );
  }

  return <Step profile={profile} socialPosts={socialPosts} />;
};

const HouseImg = styled.img`
  width: 50px;
  height: auto;
`;

const QRCodeWrapper = styled.div`
  width: 256px;
  margin: auto;
`;

const InstructionsColumn = styled(Column)`
  ${({ theme }) =>
    theme.media.tablet`
    margin-top: 32px;
    text-align: center;
  `}
`;

const CheckInTitle = styled.h2`
  text-align: center;
`;

const CheckInInstructions = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 300;
`;

type StepProps = {
  disabled?: boolean;
};

export default LiveStep;

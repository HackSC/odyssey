import * as React from "react";
import styled from "styled-components";
import { Flex, Column } from "../../styles";
import QRCode from "../QRCode";

type Props = {
  profile: Profile;
};

// Will activate closer to the hackathon
// const TITLE = `Check-In Instructions`;
// const INSTRUCTIONS = `Please show your QR Code to a HackSC volunteer or organizer. This will
// check you into the event and assign you to a house. You cannot begin
// hacking before being checked-in.`;

const TITLE = `Congrats, you're confirmed for HackSC!`;
const INSTRUCTIONS = `We're excited to have you at HackSC 2020! Be on the look out for future communications from us in the days leading up to the hackathon. If you have any questions or comments, don't hesitate to reach out to us via hackers@hacksc.com`;

const ConfirmedStep: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  return (
    <Flex justify="space-between" tabletVertical>
      <Column flexBasis={50}>
        <QRCode profile={profile} />
      </Column>

      <InstructionsColumn flexBasis={50}>
        <CheckInTitle>{TITLE}</CheckInTitle>

        <CheckInInstructions>{INSTRUCTIONS}</CheckInInstructions>
      </InstructionsColumn>
    </Flex>
  );
};

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

export default ConfirmedStep;
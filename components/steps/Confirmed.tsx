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
const INSTRUCTIONS = `We're excited to have you at HackSC 2021! Be on the look out for future communications from us in the days leading up to the hackathon. If you have any questions or comments, don't hesitate to reach out to us via team@hacksc.com or ask in the HackSC 2021 Slack org`;

const ConfirmedStep: React.FunctionComponent<Props> = (props) => {
  const { profile } = props;

  return (
    <Flex justify="space-between" tabletVertical>
      <InstructionsColumn flexBasis={100}>
        <CheckInTitle>{TITLE}</CheckInTitle>

        <CheckInInstructions>{INSTRUCTIONS}</CheckInInstructions>
      </InstructionsColumn>
    </Flex>
  );
};

const InstructionsColumn = styled(Column)`
  padding: 64px 0;

  ${({ theme }) =>
    theme.media.tablet`
    margin-top: 32px;
    text-align: center;
  `}
`;

const QRCodeCaption = styled.p`
  margin-top: 16px;
  text-align: center;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
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

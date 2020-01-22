import * as React from "react";
import styled from "styled-components";
import { Flex, Column } from "../../styles";
import QRCode from "../QRCode";

type Props = {
  profile: Profile;
};

const ConfirmedStep: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  return (
    <Flex justify="space-between" tabletVertical>
      <Column flexBasis={50}>
        <QRCode profile={profile} />
      </Column>

      <InstructionsColumn flexBasis={50}>
        <CheckInTitle>Check-In Instructions</CheckInTitle>

        <CheckInInstructions>
          Please show your QR Code to a HackSC volunteer or organizer. This will
          check you into the event and assign you to a house. You cannot begin
          hacking before being checked-in.
        </CheckInInstructions>
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

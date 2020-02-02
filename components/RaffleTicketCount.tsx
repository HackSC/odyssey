import styled from "styled-components";

import { Flex } from "../styles";

const RaffleTicketCount = () => {
  return (
    <Info>
      <Flex direction="row" justify="center" align="center" tabletVertical>
        <Subheader>You Have</Subheader>
        <BigNumber>1000</BigNumber>
        <Subheader>Raffle Tickets</Subheader>
      </Flex>
    </Info>
  );
};

const Info = styled.div`
  padding: 24px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #cfcfcf;
  margin-bottom: 24px;
`;

const Subheader = styled.h3`
  padding: 0;
  margin: 0 15px;
  font-size: 18px;
  text-transform: uppercase;
`;

const BigNumber = styled.p`
  font-size: 32px;
  ${({ theme }) => theme.media.tablet`
    padding: 20px 0;
  `}
`;

export default RaffleTicketCount;

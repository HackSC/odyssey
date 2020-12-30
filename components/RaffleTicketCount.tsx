import styled from "styled-components";

import { useRaffleCount } from "../lib/api-sdk/hackerLiveHooks";
import { Flex } from "../styles";

const RaffleTicketCount = () => {
  const { raffleCount } = useRaffleCount({ defaultOnError: console.error });

  return (
    <Info>
      <Flex direction="row" justify="center" align="center" tabletVertical>
        <Subheader>You Have</Subheader>
        <BigNumber>{raffleCount?.totalRafflePoints || 0}</BigNumber>
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

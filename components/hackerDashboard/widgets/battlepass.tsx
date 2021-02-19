// Users progress towards the next battlepass objective
import { useState } from "react";

import styled from "styled-components";

const BattlepassWidget = ({ raffleTickets }) => {
  return (
    <>
      <Wrapper>
        <h2>Battlepass Raffle</h2>
        <p>
          This virtual year, HackSC will be hosting a raffle for items in
          place of our traditional Battlepass. Prizes include a $200 giftcard
          from Appsmith, swag packs from Google, and more!{" "}
        </p>
        <p>
          Get tickets by attending workshops and other events on Zoom.
        </p>
      </Wrapper>
      <Subheader>
        You have <BigNumber>{raffleTickets}</BigNumber> raffle tickets.
      </Subheader>
    </>
  );
};

const StatusText = styled.p`
  fill: #fff;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  line-height: 14px;
`;

const RewardItem = styled.li`
  margin: 4px 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Subheader = styled.h3`
  padding: 0;
  margin: 0 15px;
  font-size: 18px;
  text-transform: uppercase;
  display: flex;
  direction: row;
  justify-content: center;
`;

const BigNumber = styled.p`
  font-size: 32px;
  margin-left: 8px;
  margin-right: 8px;
  ${({ theme }) => theme.media.tablet`
    padding: 20px 0;
  `}
`;

const GraphWrapper = styled.div`
  height: 150px;
  width: 150px;
`;

const RewardWrapper = styled.span`
  font-size: 18px;
`;

export default BattlepassWidget;

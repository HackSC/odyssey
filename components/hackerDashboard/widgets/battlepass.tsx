// Users progress towards the next battlepass objective
import { useState } from "react";

import styled from "styled-components";

const BattlepassWidget = ({ points }) => {
  return (
    <>
      <h2>Battlepass</h2>
      <h3>Current Tier: 2</h3>
      <Wrapper></Wrapper>
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
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`;

const GraphWrapper = styled.div`
  height: 150px;
  width: 150px;
`;

const RewardWrapper = styled.span`
  font-size: 18px;
`;

export default BattlepassWidget;

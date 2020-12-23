// Users progress towards the next battlepass objective
import { useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import styled from "styled-components";

import "react-circular-progressbar/dist/styles.css";

const BattlepassWidget = () => {
  const [progress, setProgress] = useState(Math.floor(Math.random() * 100));
  const styles = {
    // Customize the root svg element
    root: {
      filter: "drop-shadow(4px 8px 15px black)",
    },
    // Customize the path, i.e. the "completed progress"
    path: {
      stroke: `#4A96F0`,
      strokeLinecap: "butt",
      transition: "stroke-dashoffset 0.5s ease 0s",
      // Rotate the path
      transform: "rotate(0.25turn)",
      transformOrigin: "center center",
    },
    // Customize the circle behind the path, i.e. the "total progress"
    trail: {
      stroke: "#28303A",
      strokeLinecap: "butt",
      transformOrigin: "center center",
    },
  };

  return (
    <>
      <h2>Battlepass</h2>
      <h3>Current Tier: 2</h3>
      <Wrapper>
        <GraphWrapper>
          <CircularProgressbarWithChildren
            strokeWidth={"24"}
            styles={styles}
            value={progress}
          >
            <StatusText>
              {Math.floor(progress * Math.random() * 240)}
              <br />
              points
              <br />
              earned
            </StatusText>
          </CircularProgressbarWithChildren>
        </GraphWrapper>
        <RewardWrapper>
          <h3>Next rewards:</h3>
          <ul>
            <RewardItem>10 Raffle Tickets</RewardItem>
            <RewardItem>HackSC T-Shirt</RewardItem>
            <RewardItem>10 Raffle Tickets</RewardItem>
          </ul>
        </RewardWrapper>
      </Wrapper>
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

const RewardWrapper = styled.p`
  font-size: 18px;
`;

export default BattlepassWidget;

import * as React from "react";
import { ProgressBar } from "react-step-progress-bar";
import styled from "styled-components";

import { Flex, CenteredColumn, Fox } from "../styles";

type Props = {
  houses: Array<House>;
};

const HouseProgress = ({ houses }: Props) => {
  let result = <div></div>;
  let highestScore = -1;
  if (houses && houses.length > 0) {
    houses.forEach(house => {
      highestScore = Math.max(highestScore, house.totalScore);
    });
    houses.forEach(house => {
      result = (
        <React.Fragment>
          {result}
          <CenteredFlex justify="space-between" tabletVertical>
            <CenteredColumn flexBasis={30}>
              <FoxFlex>
                <Fox fill={house.color} width={50} height={50} />
              </FoxFlex>
            </CenteredColumn>
            <ProgressColumn flexBasis={40}>
              <ProgressBar
                filledBackground={house.color}
                percent={(house.totalScore * 100) / highestScore}
              />
            </ProgressColumn>
            <CenteredColumn flexBasis={30}>
              <Points>{house.totalScore} points</Points>
            </CenteredColumn>
          </CenteredFlex>
        </React.Fragment>
      );
    });
  }
  return <div>{result}</div>;
};

const ProgressColumn = styled(CenteredColumn)`
  width: 100%;
`;

const FoxFlex = styled.div`
  align-items: center;
  margin: auto;
  width: fit-content;
`;

const CenteredFlex = styled(Flex)`
  align-items: center;
  padding: 0.2em;
`;

const Points = styled.h4`
  text-align: center;
  padding: 10px;
`;

export default HouseProgress;

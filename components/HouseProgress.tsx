import * as React from "react";
import { ProgressBar } from "react-step-progress-bar";
import styled from "styled-components";

import { Flex, CenteredColumn, Fox } from "../styles";

type House = {
  sum: number;
  color: string;
};
type Props = {
  houses: Array<House>;
};

const HouseProgress = ({ houses }: Props) => {
  let result = <div></div>;
  let cumulativeSum = 0;
  if (houses && houses.length > 0) {
    houses.forEach(house => {
      cumulativeSum += house.sum;
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
            <CenteredColumn flexBasis={40}>
              <ProgressBar
                filledBackground={house.color}
                percent={(house.sum * 100) / cumulativeSum}
              />
            </CenteredColumn>
            <CenteredColumn flexBasis={30}>
              <Points>{house.sum} points</Points>
            </CenteredColumn>
          </CenteredFlex>
        </React.Fragment>
      );
    });
  }
  return <div>{result}</div>;
};

const FoxFlex = styled.div`
  align-items: center;
  margin: auto;
  width: fit-content;
`;

const CenteredFlex = styled(Flex)`
  align-items: center;
  padding: 1em;
`;

const Points = styled.h4`
  text-align: center;
  padding: 10px;
`;

export default HouseProgress;

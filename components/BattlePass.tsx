import React, { useMemo } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import { BPLock, BPOpenLock, Flex, Column } from "../styles";

type Props = {
  profile: Profile;
};

type ItemProps = {
  premium?: boolean;
  prizeName?: string;
  pointValue?: number;
  unlocked?: boolean;
  minimum: number;
};

const bpItem: React.SFC<ItemProps> = ({
  premium,
  prizeName,
  pointValue,
  unlocked,
  minimum
}) => {
  return (
    <TableTD
      bgColor={unlocked ? "white" : "#757575"}
      borderColor={unlocked ? "#FF8379" : "#757575"}
    >
      <LockImage>
        {unlocked ? <BPOpenLock fill="#FF8379" /> : <BPLock />}
      </LockImage>
      <MarginDiv>
        <PrizeItem>{prizeName}</PrizeItem>
        <p>Min Points: {minimum}</p>
      </MarginDiv>
    </TableTD>
  );
};

const BattlePass = ({ bp }: { bp: Battlepass }) => {
  const userPoints = 0;
  const projSubmitted = false;

  const premiumItems = bp.filter(item => {
    return item.isPremium;
  });

  const basicItems = bp.filter(item => {
    return !item.isPremium;
  });

  if (premiumItems && premiumItems.length > 0) {
    premiumItems.reduce(
      (total, item, idx) => {
        let sum = idx === 0 ? 0 : total.total + item.pointValue;
        item.unlocked = userPoints >= sum;
        item.minimum = sum;
        return { total: sum };
      },
      { total: 0 }
    );
  }
  if (basicItems && basicItems.length > 0) {
    basicItems.reduce(
      (total, item, idx) => {
        let sum = idx === 0 ? 0 : total.total + item.pointValue;
        item.unlocked = userPoints >= sum;
        item.minimum = sum;
        return { total: sum };
      },
      { total: 0 }
    );
  }

  const currentTier = useMemo(() => {
    let i = 0;
    for (i = 0; i < basicItems.length; i++) {
      const item = basicItems[i];

      if (userPoints < item.minimum) {
        break;
      }
    }

    return i - 1;
  }, [basicItems, userPoints]);

  const pointsTillNextTier = useMemo(() => {
    if (currentTier === basicItems.length) {
      return 0;
    } else {
      return basicItems[currentTier + 1].minimum - userPoints;
    }
  }, [basicItems, currentTier]);

  const bptable = (
    <BPTable>
      <tbody>
        <RoundedTR>
          {basicItems
            ? basicItems.map(item => {
                return item ? bpItem({ premium: false, ...item }) : "";
              })
            : ""}
        </RoundedTR>
        <RoundedTR>
          {premiumItems
            ? premiumItems.map(item => {
                return item ? bpItem({ premium: true, ...item }) : "";
              })
            : ""}
        </RoundedTR>
      </tbody>
    </BPTable>
  );

  return (
    <>
      <Header>BattlePass</Header>

      <Info>
        <Flex
          direction="row"
          justify="space-between"
          align="center"
          tabletVertical
        >
          <Column flexGrow={1}>
            <Flex direction="row" align="center">
              <Subheader>Tier</Subheader>
              <BigNumber>{currentTier}</BigNumber>
            </Flex>
          </Column>

          <Column flexGrow={1}>
            <Flex direction="row" align="center">
              <Subheader>Points</Subheader>
              <BigNumber>{userPoints}</BigNumber>
            </Flex>
          </Column>

          <Column flexBasis={40}>
            <Flex direction="row" align="center">
              <Subheader>Points till next tier</Subheader>
              <BigNumber>{pointsTillNextTier}</BigNumber>
            </Flex>
          </Column>
        </Flex>
      </Info>

      <OverflowHidden>
        <Scrollable>{bp ? bptable : ""}</Scrollable>
        <BattlePassFade />
      </OverflowHidden>

      <div />
    </>
  );
};

const OverflowHidden = styled.div`
  overflow: hidden;
  position: relative;
`;

const BattlePassFade = styled.div`
  content: "";
  position: absolute;
  z-index: 999;
  right: -2rem;
  top: 0;
  pointer-events: none;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    #f6f6f6 70%
  );
  width: 8rem;
  height: 100%;
`;

const LockImage = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
`;

const Header = styled.h2`
  margin-left: 5px;
`;

const Subheader = styled.h3`
  padding: 0;
  margin-right: 15px;
  font-size: 18px;
  text-transform: uppercase;
`;

const BigNumber = styled.p`
  font-size: 32px;
`;

const Info = styled.div`
  padding: 24px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #cfcfcf;
`;

const MarginDiv = styled.div`
  text-align: center;
  margin: auto;
`;

const PrizeItem = styled.h4`
  margin: auto;
`;

const BPTable = styled.table`
  border-collapse: collapse;
  width: 110%;
  margin: 18px 0;
`;

const Scrollable = styled.div`
  overflow-x: scroll;
`;

const RoundedTR = styled.tr`
  display: -webkit-inline-box;
  width: max-content;
`;

const TableTD = styled.td<{ bgColor?: string; borderColor?: string }>`
  display: -webkit-inline-box;
  position: relative;
  height: 100px;
  background-color: ${({ bgColor = "white" }) => bgColor};
  width: 120px;
  border: solid;
  padding: 10px;
  margin: 5px;
  vertical-align: middle;
  border-width: 4px;
  border-color: ${({ borderColor = "#757575" }) => borderColor};
  border-radius: 6px;
`;

export default BattlePass;

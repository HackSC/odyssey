import * as React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import useBattlePass from "../lib/useBattlePass";
import { BPLock, BPOpenLock } from "../styles";

type Props = {
  profile: Profile;
};

type ItemProps = {
  prizeName?: string;
  pointValue?: number;
  unlocked?: boolean;
};

const bpItem: React.SFC<ItemProps> = ({ prizeName, pointValue, unlocked }) => {
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
        <p>Points: {pointValue}</p>
      </MarginDiv>
    </TableTD>
  );
};

const BattlePass: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  // * useBattlePass Custom Hook
  const bp = useBattlePass(profile);

  // TODO: dynamically calculate user points and project submission
  const userPoints = 50;
  const projSubmitted = false;

  const loading = (
    <Loader
      type="Triangle"
      color="#FF8379"
      height={200}
      width={200}
      timeout={3000}
    />
  );

  const premiumItems = bp?.payload?.results?.filter(item => {
    return item.isPremium;
  });
  const basicItems = bp?.payload?.results?.filter(item => {
    return !item.isPremium;
  });
  if (premiumItems && premiumItems.length > 0) {
    premiumItems.reduce(
      (total, item, idx) => {
        let sum = idx === 0 ? item.pointValue : total.total + item.pointValue;
        // TODO: Unlocked will only be true if user submitted project

        item.unlocked =
          userPoints > total.total && projSubmitted ? true : false;
        item.total = sum;
        return { total: sum };
      },
      { total: 0 }
    );
  }
  if (basicItems && basicItems.length > 0) {
    basicItems.reduce(
      (total, item, idx) => {
        let sum = idx === 0 ? item.pointValue : total.total + item.pointValue;
        item.unlocked = userPoints > total.total ? true : false;
        item.total = sum;
        return { total: sum };
      },
      { total: 0 }
    );
  }

  const bptable = (
    <BPTable>
      <tbody>
        <RoundedTR>
          {basicItems
            ? basicItems.map(item => {
                return item ? bpItem(item) : "";
              })
            : ""}
        </RoundedTR>
        <RoundedTR>
          {premiumItems
            ? premiumItems.map(item => {
                return item ? bpItem(item) : "";
              })
            : ""}
        </RoundedTR>
      </tbody>
    </BPTable>
  );

  return (
    <>
      <Header>BattlePass</Header>
      <OverflowHidden>
        <Scrollable>
          {bp && bp.status === "loading" ? loading : ""}
          {bp && bp.status === "loaded" ? bptable : ""}
        </Scrollable>
        <BattlePassFade />
      </OverflowHidden>
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
    #f6f6f6 20%
  );
  width: 4rem;
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

const MarginDiv = styled.div`
  text-align: center;
  margin: auto;
`;

const PrizeItem = styled.h4`
  margin: auto;
`;

const BPTable = styled.table`
  border-collapse: collapse;
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
  width: 100px;
  border: solid;
  padding: 10px;
  margin: 5px;
  vertical-align: middle;
  border-width: 4px;
  border-color: ${({ borderColor = "#757575" }) => borderColor};
  border-radius: 6px;
`;

export default BattlePass;

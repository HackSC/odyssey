import * as React from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import useBattlePass from "../lib/useBattlePass";
import BPLock from "../assets/battlepasslock.svg";

type Props = {
  profile: Profile;
};

const BattlePass: React.FunctionComponent<Props> = props => {
  const { profile } = props;
  // * useBattlePass Custom Hook
  const bp = useBattlePass(profile);

  console.log(bp);

  const loading = (
    <Loader
      type="Triangle"
      color="#FF8379"
      height={200}
      width={200}
      timeout={3000}
    />
  );

  const bptable = (
    <BPTable>
      <tbody>
        <RoundedTR>
          {bp?.payload?.results?.map(item => {
            return item && !item.isPremium ? (
              <TableTD>
                <LockImage src={BPLock} alt="lock" />
                <MarginDiv>
                  <PrizeItem>
                    {item && item.prizeName ? item.prizeName : "Some Prize"}
                  </PrizeItem>
                  <p>Points: {item.pointValue}</p>
                </MarginDiv>
              </TableTD>
            ) : (
              ""
            );
          })}
        </RoundedTR>
        <RoundedTR>
          {bp?.payload?.results?.map(item => {
            return item && item.isPremium ? (
              <TableTD>
                <LockImage src={BPLock} alt="lock" />
                <MarginDiv>
                  <PrizeItem>
                    {item && item.prizeName ? item.prizeName : "Some Prize"}
                  </PrizeItem>
                  <p>Points: {item.pointValue}</p>
                </MarginDiv>
              </TableTD>
            ) : (
              ""
            );
          })}
        </RoundedTR>
      </tbody>
    </BPTable>
  );

  return (
    <>
      <Header>BattlePass</Header>
      <Scrollable>
        {bp.status === "loading" ? loading : ""}
        {bp.status === "loaded" ? bptable : ""}
      </Scrollable>
    </>
  );
};

const LockImage = styled.img`
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

const TableTD = styled.td`
  display: -webkit-inline-box;
  position: relative;
  height: 100px;
  background-color: white;
  width: 100px;
  border: solid;
  padding: 10px;
  margin: 5px;
  vertical-align: middle;
  border-width: 4px;
  border-color: #757575;
  border-radius: 6px;
`;

export default BattlePass;

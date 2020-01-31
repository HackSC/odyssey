import { useState, useEffect } from "react";
import styled from "styled-components";

import QRCode from "../QRCode";
import LinkScroll from "../LinkScroll";
import { Flex, CenteredColumn, Column, Fox, Alert } from "../../styles";
import Announcements from "../announcements/Announcements";
import Calendar from "../Calendar";
import BattlePass from "../BattlePass";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import HouseProgress from "../HouseProgress";
import {
  usePersonInfoSelf,
  useBattlepass,
  useAllHouseInfo
} from "../../lib/api-sdk/hackerLiveHooks";
import { MdClose } from "react-icons/md";

interface Props {
  profile: Profile;
  houses: any;
}

const CheckedIn: React.FunctionComponent<Props> = props => {
  const { profile } = props;
  const [alert, setAlert] = useState(false);
  const { allHouses } = useAllHouseInfo({});
  const { battlepass } = useBattlepass({ defaultOnError: console.log });
  const { personInfo } = usePersonInfoSelf({ defaultOnError: console.log });
  const { width, height } = useWindowSize();
  // TODO: setup is winning again
  // * Check if house is in the lead and display react-confetti
  const confetti = (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={400}
      recycle={false}
      colors={["#86DCEA", "#FEDA22", "#FF8379", "#FF414D", "#FF2B9D"]}
      tweenDuration={10000}
    />
  );

  let HouseFoxColor = personInfo?.Home.color ?? "#E7862B";

  if (!personInfo) {
    return <span></span>;
  }

  return (
    <>
      <Alert
        display={alert}
        background={"#FF8379"}
        borderColor={"white"}
        color={"white"}
        borderRadius={7}
        margin={"1em"}
      >
        <MdClose
          color={"white"}
          onClick={() => setAlert(false)}
          style={{ position: "absolute", top: "5px", left: "5px" }}
        />
        <h2 style={{ padding: "0" }}>Keep it up! Your house is in the lead!</h2>
      </Alert>
      <PaddedFlex
        style={!alert ? { paddingTop: "2em" } : {}}
        justify="space-between"
        tabletVertical
      >
        <Column flexBasis={40}>
          <QRCode profile={profile} />
        </Column>

        <InstructionsColumn flexBasis={60}>
          <CheckInTitle>
            {profile && profile.firstName
              ? `Hey there, ${profile.firstName}!`
              : "Hey there!"}
          </CheckInTitle>

          <Flex justify="space-between" tabletVertical>
            <CenteredColumn flexBasis={70}>
              <HouseProgress houses={allHouses} />
            </CenteredColumn>
            <BlackHR />
            <CenteredColumn flexBasis={30}>
              <FoxFlex>
                <Fox fill={HouseFoxColor} width={50} height={50} />
              </FoxFlex>
              <PointsTitle>You've contributed</PointsTitle>
              <PointsTitle>{personInfo.totalPoints || ""} points!</PointsTitle>
            </CenteredColumn>
          </Flex>
        </InstructionsColumn>
      </PaddedFlex>
      <PaddedFlex justify="space-between" tabletVertical>
        <MarginedColumn style={{ overflowX: "scroll" }} flexBasis={75}>
          <BattlePass bp={battlepass} />
        </MarginedColumn>
        <MarginedColumn flexBasis={25}>
          <Announcements />
        </MarginedColumn>
      </PaddedFlex>
      <PaddedFlex tabletVertical>
        <Calendar />
      </PaddedFlex>
      <PaddedFlex justify="space-between" tabletVertical>
        <MarginedColumn flexBasis={35}>
          <LinkScroll />
        </MarginedColumn>
        <MarginedColumn flexBasis={65}>
          <CheckInTitle>History</CheckInTitle>
          <CheckInInstructions>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </CheckInInstructions>
        </MarginedColumn>
      </PaddedFlex>
    </>
  );
};

const PaddedFlex = styled(Flex)`
  padding: 1em;
`;

const BlackHR = styled.hr`
  width: 1px;
  background-color: black;
  border-radius: 6px;
  border-color: black;
`;

const FoxFlex = styled.div`
  align-items: center;
  margin: auto;
  width: fit-content;
  padding: 0.5em;
`;

const MarginedColumn = styled(Column)`
  margin: 1rem;
`;

const InstructionsColumn = styled(Column)`
  margin: 0 15px;
  ${({ theme }) =>
    theme.media.tablet`
    margin-top: 32px;
    text-align: center;
  `}
`;

const PointsTitle = styled.h4`
  text-align: center;
  padding-bottom: 0.1em;
  margin: 0 15px;
`;

const CheckInTitle = styled.h2`
  text-align: center;
  padding-bottom: 15px;
`;

const CheckInInstructions = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 300;
`;

export default CheckedIn;

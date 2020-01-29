import * as React from "react";
import styled from "styled-components";

import QRCode from "../QRCode";
import LinkScroll from "../LinkScroll";
import { Flex, CenteredColumn, Column, Fox } from "../../styles";
import Announcements from "../announcements/Announcements";
import Calendar from "../Calendar";
import BattlePass from "../BattlePass";
import useHouses from "../../lib/useHouses";
import usePerson from "../../lib/usePerson";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import HouseProgress from "../HouseProgress";

interface Props {
  profile: Profile;
  houses: any;
}

const CheckedIn: React.FunctionComponent<Props> = props => {
  const { profile } = props;
  const houseInfo = useHouses(profile);
  const person = usePerson(props);
  const { width, height } = useWindowSize();

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

  const notie =
    person.length > 0 &&
    houseInfo.length > 1 &&
    person[0].id === houseInfo[0].id &&
    person[0].id !== houseInfo[1].id;

  let HouseFoxColor = person.length > 0 ? person[0].color : "#E7862B";

  return (
    <>
      <Flex justify="space-between" tabletVertical>
        {notie ? confetti : ""}
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
              <HouseProgress houses={houseInfo} />
            </CenteredColumn>
            <BlackHR />
            <CenteredColumn flexBasis={30}>
              <FoxFlex>
                <Fox fill={HouseFoxColor} width={50} height={50} />
              </FoxFlex>
              <PointsTitle>You've contributed</PointsTitle>
              <PointsTitle>
                {person.length > 0 ? person[0]?.sum : ""} points!
              </PointsTitle>
            </CenteredColumn>
          </Flex>
        </InstructionsColumn>
      </Flex>
      <Flex justify="space-between" tabletVertical>
        <MarginedColumn style={{ overflowX: "scroll" }} flexBasis={75}>
          <BattlePass profile={profile} />
        </MarginedColumn>
        <MarginedColumn flexBasis={25}>
          <Announcements />
        </MarginedColumn>
      </Flex>
      <Flex tabletVertical>
        <Calendar />
      </Flex>
      <Flex justify="space-between" tabletVertical>
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
      </Flex>
    </>
  );
};

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
  margin: 2rem;
`;

const InstructionsColumn = styled(Column)`
  margin: 0 15px;
  ${({ theme }) =>
    theme.media.tablet`
    margin-top: 32px;
    text-align: center;
  `}
`;

const PointsTitle = styled.h3`
  text-align: center;
  padding-bottom: 0.1em;
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

import * as React from "react";
import styled from "styled-components";

import QRCode from "../QRCode";
import LinkScroll from "../LinkScroll";
import { Flex, Column } from "../../styles";
import HouseLogo from "../../assets/hackscFox.png";
import Announcements from "../announcements/Announcements";
import Calendar from "../Calendar";
import BattlePass from "../BattlePass";
import useHouses from "../../lib/useHouses";
import usePerson from "../../lib/usePerson";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

interface Props {
  profile: Profile;
  houses: any;
}

const CheckedIn: React.FunctionComponent<Props> = props => {
  const { profile } = props;
  const houseInfo = useHouses(profile);
  const person = usePerson(props);
  const { width, height } = useWindowSize();

  console.log(houseInfo);
  console.log(person);
  console.log(profile);

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

  let notie =
    person.length > 0 &&
    houseInfo.length > 1 &&
    person[0].id === houseInfo[0].id &&
    person[0].id !== houseInfo[1].id;

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
            <Column flexBasis={50}>
              <CheckInTitle>
                {houseInfo.length > 0 && houseInfo[0].name
                  ? houseInfo[0].name
                  : ""}{" "}
                House
              </CheckInTitle>
              <Flex justify="space-between" tabletVertical>
                <ImgColumn flexBasis={50}>
                  <HouseImg src={HouseLogo} alt="House Logo" />
                </ImgColumn>
                <Column flexBasis={50}>
                  <CheckInTitle>
                    {houseInfo.length > 0 && houseInfo[0].sum
                      ? houseInfo[0].sum
                      : ""}{" "}
                    points
                  </CheckInTitle>
                </Column>
              </Flex>
            </Column>
            <hr style={{ width: "5px" }}></hr>
            <Column flexBasis={50}>
              <CheckInTitle>You</CheckInTitle>
              <Flex justify="space-between" tabletVertical>
                <ImgColumn flexBasis={50}>
                  <HouseImg src={HouseLogo} alt="House Logo" />
                </ImgColumn>
                <Column flexBasis={50}>
                  <CheckInTitle>
                    {person.length > 0 ? person[0]?.sum : ""} points
                  </CheckInTitle>
                </Column>
              </Flex>
            </Column>
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

const MarginedColumn = styled(Column)`
  margin: 2rem;
`;

const HouseImg = styled.img`
  width: 50px;
  height: auto;
`;

const InstructionsColumn = styled(Column)`
  margin: 0 15px;
  ${({ theme }) =>
    theme.media.tablet`
    margin-top: 32px;
    text-align: center;
  `}
`;

const ImgColumn = styled(Column)`
  text-align: center;
`;

const CheckInTitle = styled.h2`
  text-align: center;
  padding: 10px;
`;

const CheckInInstructions = styled.p`
  margin: 0;
  padding: 0;
  font-weight: 300;
`;

export default CheckedIn;

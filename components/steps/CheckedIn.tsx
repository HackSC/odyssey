import * as React from "react";
import styled from "styled-components";

import QRCode from "../QRCode";
import LinkScroll from "../LinkScroll";
import { Flex, Column } from "../../styles";
import HouseLogo from "../../assets/hackscFox.png";

type Props = {
  profile: Profile;
};

const CheckedIn: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  return (
    <>
      <Flex justify="space-between" tabletVertical>
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
              <CheckInTitle>House</CheckInTitle>
              <Flex justify="space-between" tabletVertical>
                <ImgColumn flexBasis={50}>
                  <HouseImg src={HouseLogo} alt="House Logo" />
                </ImgColumn>
                <Column flexBasis={50}>
                  <CheckInTitle>Points here</CheckInTitle>
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
                  <CheckInTitle>Points here</CheckInTitle>
                </Column>
              </Flex>
            </Column>
          </Flex>
        </InstructionsColumn>
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

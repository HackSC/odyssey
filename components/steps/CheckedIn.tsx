import * as React from "react";
import styled from "styled-components";

import QRCode from "../QRCode";
import { Flex, Column } from "../../styles";
import HouseLogo from "../../assets/hackscFox.png";

type Props = {
  profile: Profile;
};

const CheckedIn: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  return (
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
  );
};

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

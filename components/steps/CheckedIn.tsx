import { useState, useEffect } from "react";
import styled from "styled-components";

import QRCode from "../QRCode";
import LinkScroll from "../LinkScroll";
import { Flex, CenteredColumn, Column, Fox, Alert, Button } from "../../styles";
import BattlePass from "../BattlePass";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import HouseProgress from "../HouseProgress";
import {
  usePersonInfoSelf,
  useBattlepass,
  useAllHouseInfo,
  useIncompleteTasks,
} from "../../lib/api-sdk/hackerLiveHooks";
import { useEventsList } from "../../lib/api-sdk/eventHooks";
import { MdClose } from "react-icons/md";
import ContributionHistory from "../ContributionHistory";
import Events from "../events/Events";
import IncompleteTasks from "../IncompleteTasks";

interface Props {
  profile: Profile;
  houses: any;
}

const CheckedIn: React.FunctionComponent<Props> = (props) => {
  const { profile, houses } = props;
  const [alert, setAlert] = useState("none");
  const { allHouses } = useAllHouseInfo({});
  const { battlepass } = useBattlepass({ defaultOnError: console.error });
  const { personInfo } = usePersonInfoSelf({ defaultOnError: console.error });
  const { allEvents } = useEventsList({ defaultOnError: console.error });
  const { incompleteTasks } = useIncompleteTasks({
    defaultOnError: console.error,
  });

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

  let HouseFoxColor = personInfo?.Home?.color ?? "#E7862B";

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
          onClick={() => setAlert("none")}
          style={{ position: "absolute", top: "5px", left: "5px" }}
        />
        <h2 style={{ padding: "0" }}>Keep it up! Your house is in the lead!</h2>
      </Alert>
      <PaddedFlex
        style={alert === "none" ? { paddingTop: "2em" } : {}}
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
              <PointsTitle>You have</PointsTitle>
              <PointsTitle>
                <b>{personInfo.totalPoints ?? "0"} points!</b>
              </PointsTitle>
            </CenteredColumn>
          </Flex>
        </InstructionsColumn>
      </PaddedFlex>
      <PaddedFlex justify="space-between" tabletVertical>
        <MarginedColumn style={{ overflowX: "scroll" }} flexBasis={100}>
          <BattlePass
            bp={battlepass}
            userPoints={personInfo.totalPoints}
            projSubmitted={personInfo.isBattlepassComplete}
          />
          <UnlockMessage>
            Unlock premium tier prizes when your team submits a project
          </UnlockMessage>
        </MarginedColumn>
      </PaddedFlex>
      <PaddedFlex tabletVertical>
        <Events events={allEvents} />
      </PaddedFlex>
      <PaddedFlex justify="space-between" tabletVertical>
        <MarginedColumn flexBasis={35}>
          <LinkScroll />
        </MarginedColumn>
        <MarginedColumn flexBasis={65}>
          <CheckInTitle>Tasks To-Do</CheckInTitle>
          <IncompleteTasks incompleteTasks={incompleteTasks} />

          <br />
          <br />

          <CheckInTitle>Task History</CheckInTitle>
          <ContributionHistory contributions={personInfo.Contributions} />
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

const UnlockMessage = styled.p`
  font-size: 18px;
  font-style: italic;
`;

export default CheckedIn;

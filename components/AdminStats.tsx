import React, { useEffect, useState } from "react";
import { CenteredColumn, Flex } from "../styles";
import { liveLookupFetch } from "../lib/api-sdk/liveHooks";
import styled from "styled-components";

const AdminStats = ({ profile, showtitle = true }) => {
  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    let [firstName, lastName, email] = ["", "", ""];
    liveLookupFetch({ firstName, lastName, email }).then((res) => {
      setProfiles(res.success);
    });
  }, []);

  console.log(profiles);
  if (profile.role != "admin") return <></>;
  return (
    <Container>
      {showtitle ? <h2>Statistics</h2> : ""}
      <PaddedFlex justify="space-between" tabletVertical>
        <FlexCenterColumn flexBasis={50}>
          <SubHeader>Profile Stats</SubHeader>
          <SubTitle>
            Total Profiles:{" "}
            <GreyColoredText>{profiles ? profiles.length : ""}</GreyColoredText>
          </SubTitle>
          <SubTitle>
            Hackers:{" "}
            <GreyColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce((a, b) => a + (b.role == "hacker" ? 1 : 0), 0)
                : ""}
            </GreyColoredText>
          </SubTitle>
          <SubTitle>
            Admins:{" "}
            <GreyColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce((a, b) => a + (b.role == "admin" ? 1 : 0), 0)
                : ""}
            </GreyColoredText>
          </SubTitle>
          <SubTitle>
            Volunteers:{" "}
            <GreyColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.role == "volunteer" ? 1 : 0),
                    0
                  )
                : ""}
            </GreyColoredText>
          </SubTitle>
          <SubTitle>
            Sponsors:{" "}
            <GreyColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.role == "sponsor" ? 1 : 0),
                    0
                  )
                : ""}
            </GreyColoredText>
          </SubTitle>
        </FlexCenterColumn>
        <BlackHR />
        <FlexCenterColumn flexBasis={50}>
          <SubHeader>Application Stats</SubHeader>
          <SubTitle>
            Submitted Applications:{" "}
            <GreyColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) =>
                      a +
                      (b.status != "verified" && b.status != "unverified"
                        ? 1
                        : 0),
                    0
                  )
                : ""}
            </GreyColoredText>
          </SubTitle>
          <SubTitle>
            Unsubmitted Applications:{" "}
            <GreyColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) =>
                      a +
                      (b.status == "verified" || b.status == "unverified"
                        ? 1
                        : 0),
                    0
                  )
                : ""}
            </GreyColoredText>
          </SubTitle>
          <SubTitle>
            Accepted Hackers:{" "}
            <GreenColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) =>
                      a +
                      (b.status != "verified" &&
                      b.status != "unverified" &&
                      b.status != "submitted" &&
                      b.status != "waitlisted" &&
                      b.status != "rejected"
                        ? 1
                        : 0),
                    0
                  )
                : ""}
            </GreenColoredText>
          </SubTitle>
          <SubTitle>
            Waitlisted Hackers:{" "}
            <GoldColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.status == "waitlisted" ? 1 : 0),
                    0
                  )
                : ""}
            </GoldColoredText>
          </SubTitle>
          <SubTitle>
            Rejected Hackers:{" "}
            <RedColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.status == "rejected" ? 1 : 0),
                    0
                  )
                : ""}
            </RedColoredText>
          </SubTitle>
        </FlexCenterColumn>
      </PaddedFlex>
      <PaddedFlex justify="space-between" tabletVertical>
        <FlexCenterColumn flexBasis={50}>
          <SubHeader>Year Stats</SubHeader>
          <SubTitle>
            Freshmen:{" "}
            <TanColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.year == "freshman" ? 1 : 0),
                    0
                  )
                : ""}
            </TanColoredText>
          </SubTitle>
          <SubTitle>
            Sophomores:{" "}
            <TanColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.year == "sophomore" ? 1 : 0),
                    0
                  )
                : ""}
            </TanColoredText>
          </SubTitle>
          <SubTitle>
            Juniors:{" "}
            <TanColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce((a, b) => a + (b.year == "junior" ? 1 : 0), 0)
                : ""}
            </TanColoredText>
          </SubTitle>
          <SubTitle>
            Seniors:{" "}
            <TanColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce((a, b) => a + (b.year == "senior" ? 1 : 0), 0)
                : ""}
            </TanColoredText>
          </SubTitle>
          <SubTitle>
            Graduates:{" "}
            <TanColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.year == "graduate" ? 1 : 0),
                    0
                  )
                : ""}
            </TanColoredText>
          </SubTitle>
        </FlexCenterColumn>
        <BlackHR />
        <FlexCenterColumn flexBasis={50}>
          <SubHeader>Skill Level Stats</SubHeader>
          <SubTitle>
            Beginner:{" "}
            <RedColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.skillLevel == "beginner" ? 1 : 0),
                    0
                  )
                : ""}
            </RedColoredText>
          </SubTitle>
          <SubTitle>
            Intermediate:{" "}
            <GoldColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.skillLevel == "intermediate" ? 1 : 0),
                    0
                  )
                : ""}
            </GoldColoredText>
          </SubTitle>
          <SubTitle>
            Advanced:{" "}
            <GreenColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.skillLevel == "advanced" ? 1 : 0),
                    0
                  )
                : ""}
            </GreenColoredText>
          </SubTitle>
        </FlexCenterColumn>
      </PaddedFlex>
      <PaddedFlex justify="space-between" tabletVertical>
        <FlexCenterColumn flexBasis={50}>
          <SubHeader>Shirt Sizes</SubHeader>
          <SubTitle>
            Extra Small:{" "}
            <BlueColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.shirtSize == "xs" ? 1 : 0),
                    0
                  )
                : ""}
            </BlueColoredText>
          </SubTitle>
          <SubTitle>
            Small:{" "}
            <BlueColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce((a, b) => a + (b.shirtSize == "s" ? 1 : 0), 0)
                : ""}
            </BlueColoredText>
          </SubTitle>
          <SubTitle>
            Medium:{" "}
            <BlueColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce((a, b) => a + (b.shirtSize == "m" ? 1 : 0), 0)
                : ""}
            </BlueColoredText>
          </SubTitle>
          <SubTitle>
            Large:{" "}
            <BlueColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce((a, b) => a + (b.shirtSize == "l" ? 1 : 0), 0)
                : ""}
            </BlueColoredText>
          </SubTitle>
          <SubTitle>
            Extra Large:{" "}
            <BlueColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.shirtSize == "xl" ? 1 : 0),
                    0
                  )
                : ""}
            </BlueColoredText>
          </SubTitle>
        </FlexCenterColumn>
        <BlackHR />
        <FlexCenterColumn flexBasis={50}>
          <SubHeader>Preferred Pronouns</SubHeader>
          <SubTitle>
            He/Him/His:{" "}
            <OrangeColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce((a, b) => a + (b.gender == "male" ? 1 : 0), 0)
                : ""}
            </OrangeColoredText>
          </SubTitle>
          <SubTitle>
            She/Her/Hers:{" "}
            <OrangeColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.gender == "female" ? 1 : 0),
                    0
                  )
                : ""}
            </OrangeColoredText>
          </SubTitle>
          <SubTitle>
            They/Them/Theirs:{" "}
            <OrangeColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.gender == "non-binary" ? 1 : 0),
                    0
                  )
                : ""}
            </OrangeColoredText>
          </SubTitle>
          <SubTitle>
            Other:{" "}
            <OrangeColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.gender == "other" ? 1 : 0),
                    0
                  )
                : ""}
            </OrangeColoredText>
          </SubTitle>
          <SubTitle>
            No-Say:{" "}
            <OrangeColoredText>
              {profiles && profiles.length > 0
                ? profiles.reduce(
                    (a, b) => a + (b.gender == "no-say" ? 1 : 0),
                    0
                  )
                : ""}
            </OrangeColoredText>
          </SubTitle>
        </FlexCenterColumn>
      </PaddedFlex>
    </Container>
  );
};

const PaddedFlex = styled(Flex)`
  padding: 1rem 0 1rem 0;
`;

const ColoredText = styled.span`
  font-weight: 600;
  font-style: italic;
  padding: 2px;
  padding-right: 4px;
`;

const RedColoredText = styled(ColoredText)`
  background-color: #ff9999;
`;

const BlueColoredText = styled(ColoredText)`
  background-color: #abcdef;
`;

const OrangeColoredText = styled(ColoredText)`
  background-color: #ffc87c;
`;

const GreenColoredText = styled(ColoredText)`
  background-color: #90ee90;
`;

const GoldColoredText = styled(ColoredText)`
  background-color: #ffe84c;
`;

const GreyColoredText = styled(ColoredText)`
  background-color: #dcdcdc;
`;

const TanColoredText = styled(ColoredText)`
  background-color: #fadfad;
`;

const Container = styled.div`
  padding: 2rem 0 0 0;
`;

const SubHeader = styled.h3`
  font-weight: 600;
  margin: auto;
`;

const SubTitle = styled.h3`
  font-weight: 500;
  margin: auto;
`;

const FlexCenterColumn = styled(CenteredColumn)`
  display: flex;
  flex-direction: column;
`;

const BlackHR = styled.hr`
  width: 1px;
  background-color: black;
  border-radius: 6px;
  border-color: black;
`;

export default AdminStats;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

import { FcNumericalSorting12, FcNumericalSorting21 } from "react-icons/fc";
import { Head, Navbar, Footer, AppReview, Hacker } from "../../components";
import { Background, Flex, Container, Column, Button } from "../../styles";
import { handleLoginRedirect, getProfile } from "../../lib";

const AppLeaderboard = ({ profile }) => {
  const [sortOrder, setSortOrder] = useState(-1); // * -1 is descending, 1 is ascending
  const [acceptedHackers, setAcceptedHackers] = useState([]);

  let fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/reviewedProfiles"
    : "api/admin/reviewedProfiles";

  let { data: reviewProfileData, error: reviewProfileError } = useSWR(fetchUrl);

  useEffect(() => {
    if (reviewProfileData && reviewProfileData.reviewedProfiles) {
      reviewProfileData.reviewedProfiles.sort((hacker_a, hacker_b) => {
        // * Sum HackerReviews reviews for a and b
        let a_sum = hacker_a.HackerReviews.reduce(
          (a, b) => b.scoreOne + b.scoreTwo + b.scoreThree + a,
          0
        );
        let b_sum = hacker_b.HackerReviews.reduce(
          (a, b) => b.scoreOne + b.scoreTwo + b.scoreThree + a,
          0
        );

        return a_sum > b_sum ? sortOrder : sortOrder == 1 ? -1 : 1;
      });

      let accepted_hackers = reviewProfileData.reviewedProfiles.filter(
        (temp_hacker) =>
          temp_hacker.status === "accepted" ||
          temp_hacker.status === "checkedIn"
      );

      setAcceptedHackers(accepted_hackers);
    }
  }, [reviewProfileData, sortOrder]);

  fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/reviews"
    : "api/admin/reviews";

  let { data: reviewData, error: reviewError } = useSWR(fetchUrl);

  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn admin activePage="/appLeaderboard" />
      <Background padding={"3rem 0"}>
        <Container width={"96%"}>
          <Flex direction="row">
            <MaxHeightColumn flexBasis={35}>
              <TitleFlex direction="row">
                <OnePaddedH1>Recent Reviews</OnePaddedH1>
              </TitleFlex>
              <PaddedBottomDiv>
                Welcome to the application leaderboard. Here you can view a list
                of hacker applications to HackSC. If you have any questions or
                find any errors, hit up the engineers in{" "}
                <b>#{new Date().getFullYear()}-engineering</b>
              </PaddedBottomDiv>
              <CardContainer>
                {reviewData &&
                reviewData.reviews &&
                reviewData.reviews.length > 0
                  ? reviewData.reviews.map((review, index) => (
                      <AppReview
                        index={index + 1}
                        key={Object.entries(review).join()}
                        review={review}
                      />
                    ))
                  : ""}
              </CardContainer>
            </MaxHeightColumn>
            <MaxHeightColumn flexBasis={65}>
              <TitleFlex direction="row">
                <OnePaddedH1>Leaderboard</OnePaddedH1>
                <DevModeButton
                  onClick={() => setSortOrder(sortOrder == 1 ? -1 : 1)}
                >
                  {sortOrder == 1 ? (
                    <FcNumericalSorting21 size={"2rem"} />
                  ) : (
                    <FcNumericalSorting12 size={"2rem"} />
                  )}
                </DevModeButton>
              </TitleFlex>
              <PaddedBottomDiv>
                <p>
                  # Reviewed Hackers:{" "}
                  <GoldColoredText>
                    {reviewProfileData
                      ? reviewProfileData.reviewedProfiles.length
                      : 0}
                  </GoldColoredText>
                </p>
                <p>
                  # Accepted Hackers:{" "}
                  <GreenColoredText>{acceptedHackers.length}</GreenColoredText>
                </p>
              </PaddedBottomDiv>
              <CardContainer>
                {reviewProfileData &&
                reviewProfileData.reviewedProfiles &&
                reviewProfileData.reviewedProfiles.length > 0
                  ? reviewProfileData.reviewedProfiles.map((hacker, index) => (
                      <Hacker
                        acceptedHackers={acceptedHackers}
                        setAcceptedHackersCallback={setAcceptedHackers}
                        showAcceptButton={true}
                        profile={profile}
                        index={index + 1}
                        key={Object.entries(hacker).join()}
                        hacker={hacker}
                      />
                    ))
                  : ""}
              </CardContainer>
            </MaxHeightColumn>
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

AppLeaderboard.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || profile.role !== "admin") {
    handleLoginRedirect(req);
  }

  return {
    profile,
  };
};

const ColoredText = styled.span`
  font-weight: 600;
  font-style: italic;
  padding: 2px;
  padding-right: 4px;
`;

const GoldColoredText = styled(ColoredText)`
  background-color: #ffe84c;
`;

const GreenColoredText = styled(ColoredText)`
  background-color: #90ee90;
`;

const MaxHeightColumn = styled(Column)`
  padding: 1rem;
  min-width: 300px;
  max-height: 75vh;
  display: flex;
  flex-direction: column;
`;

const DevModeButton = styled(Button)`
  max-width: 120px;
  min-height: 3rem;
  margin: 0 0 0 auto;
  padding: 0;
  color: black;
  outline: none;
  background-color: #f6f6f6;

  &:hover {
    background-color: #ff8379 !important;
    color: white !important;
  }
`;

const PaddedBottomDiv = styled.div`
  padding: 0 0 2rem 0;
`;

const OnePaddedH1 = styled.h1`
  margin: auto 0;
  padding: 0 1rem 0 0;
`;

const TitleFlex = styled(Flex)`
  width: 100%;
  min-height: 3rem;
  margin: 0 0 1rem 0;
`;

const CardContainer = styled.div`
  width: 100%;
  flex: 1 1 auto;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  padding: 32px;
  box-sizing: border-box;
  overflow-y: scroll;
`;

export default AppLeaderboard;

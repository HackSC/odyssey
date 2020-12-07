import React, { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

import { FcNumericalSorting12, FcNumericalSorting21 } from "react-icons/fc";
import { Head, Navbar, Footer, AppReview, Hacker } from "../../components";
import { Background, Flex, Container, Column, Button } from "../../styles";
import { handleLoginRedirect, getProfile } from "../../lib";

const AppLeaderboard = ({ profile }) => {
  const [sortOrder, setSortOrder] = useState(-1); // * -1 is descending, 1 is ascending

  let fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/reviewedProfiles"
    : "api/admin/reviewedProfiles";

  let { data: reviewProfileData, error: reviewProfileError } = useSWR(fetchUrl);
  if (reviewProfileData && reviewProfileData.reviewedProfiles)
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
          <Flex direction="row" style={{ flexWrap: "wrap" }}>
            <Column
              style={{ padding: "1rem", minWidth: "300px" }}
              flexBasis={35}
            >
              <TitleFlex direction="row">
                <OnePaddedH1>Recent Reviews</OnePaddedH1>
              </TitleFlex>
              <PaddedBottomP>
                Welcome to the application leaderboard. Here you can view a list
                of hacker applications to HackSC. If you have any questions or
                find any errors, hit up the engineers in{" "}
                <b>#{new Date().getFullYear()}-engineering</b>
              </PaddedBottomP>
              <Flex
                direction="column"
                style={{
                  paddingBottom: "2rem",
                  height: "min-content",
                  justifyContent: "center",
                }}
              >
                {reviewData &&
                reviewData.reviews &&
                reviewData.reviews.length > 0
                  ? reviewData.reviews.map((review) => (
                      <AppReview
                        key={Object.entries(review).join()}
                        review={review}
                      />
                    ))
                  : ""}
              </Flex>
            </Column>
            <Column
              style={{ padding: "1rem", minWidth: "300px" }}
              flexBasis={65}
            >
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
              <Leaderboard>
                {reviewProfileData &&
                reviewProfileData.reviewedProfiles &&
                reviewProfileData.reviewedProfiles.length > 0
                  ? reviewProfileData.reviewedProfiles.map((hacker) => (
                      <Hacker
                        key={Object.entries(hacker).join()}
                        hacker={hacker}
                      />
                    ))
                  : ""}
              </Leaderboard>
            </Column>
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

const PaddedBottomP = styled.p`
  padding: 0 0 2rem 0;
`;

const OnePaddedH1 = styled.h1`
  margin: auto 0;
  padding: 0 1rem 0 0;
`;

const ZeroPaddedH1 = styled.h1`
  padding-bottom: 0px;
`;

const TitleFlex = styled(Flex)`
  width: 100%;
  min-height: 3rem;
  margin: 0 0 1rem 0;
`;

const LeaderboardHeader = styled.h1`
  margin: 0 0 1rem 0;
`;

const Leaderboard = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

//margin: 0 0 16px;
const Action = styled.a`
  box-sizing: border-box;
  padding: 24px 36px;
  background: #ffffff;
  border-radius: 4px;
  text-align: center;
  flex-basis: 49%;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  transition: 0.25s all;

  min-width: 200px;
  margin: auto auto 16px auto;

  &:hover {
    transform: scale(1.025);
  }
`;

const ActionTitle = styled.h3`
  padding-bottom: 0;
  color: ${({ theme }) => theme.colors.gray50};
`;

export default AppLeaderboard;

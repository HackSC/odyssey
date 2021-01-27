import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

import { FcNumericalSorting12, FcNumericalSorting21 } from "react-icons/fc";
import {
  Head,
  Navbar,
  Footer,
  AppReview,
  Hacker,
  AdminReview,
} from "../../components";
import { Background, Flex, Container, Column, Button } from "../../styles";
import { handleLoginRedirect, getProfile } from "../../lib";

const AppLeaderboard = ({ profile }) => {
  const [sortOrder, setSortOrder] = useState(-1); // * -1 is descending, 1 is ascending
  const [adminSortOrder, setAdminSortOrder] = useState(-1); // * -1 is descending, 1 is ascending
  const [adminDataSorted, setAdminDataSorted] = useState(0);
  const [recentReviewCount, setRecentReviewCount] = useState(10);
  const [hackerCount, setHackerCount] = useState(10);
  const [refreshHackerCount, setRefreshHackerCount] = useState(10);
  const [refreshRecentReviewCount, setRefreshRecentReviewCount] = useState(10);

  let fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE +
      "api/admin/reviewedProfiles?count=" +
      refreshHackerCount
    : "api/admin/reviewedProfiles?count=" + refreshHackerCount;

  let { data: reviewProfileData, error: reviewProfileError } = useSWR(fetchUrl);

  fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/admin-reviews"
    : "api/admin/admin-reviews";

  let { data: adminReviewData, error: adminReviewError } = useSWR(fetchUrl);

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
    }
  }, [reviewProfileData, sortOrder]);

  useEffect(() => {
    if (!adminDataSorted && adminReviewData && adminReviewData.reviews) {
      setAdminDataSorted(1);
      adminReviewData.reviews.sort((admin_a, admin_b) => {
        let a_sum = admin_a.hacker_reviews ? admin_a.hacker_reviews.length : 0;
        let b_sum = admin_b.hacker_reviews ? admin_b.hacker_reviews.length : 0;

        return a_sum > b_sum ? adminSortOrder : adminSortOrder == 1 ? -1 : 1;
      });
    }
  }, [adminSortOrder, adminReviewData]);

  fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE +
      "api/admin/reviews?count=" +
      refreshRecentReviewCount
    : "api/admin/reviews?count=" + refreshRecentReviewCount;

  let { data: reviewData, error: reviewError } = useSWR(fetchUrl);

  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar
        loggedIn
        admin
        superadmin={profile.role === "superadmin"}
        activePage="/appLeaderboard"
      />
      <Background padding="2rem">
        <Container width={"100%"}>
          <Flex direction="row" style={{ padding: "1rem 0", flexWrap: "wrap" }}>
            <TitleFlex direction="row">
              <OnePaddedH1>Admin Review Rankings</OnePaddedH1>
              <DevModeButton
                onClick={() => {
                  setAdminDataSorted(0);
                  setAdminSortOrder(adminSortOrder == 1 ? -1 : 1);
                }}
              >
                {adminSortOrder == 1 ? (
                  <FcNumericalSorting21 size={"2rem"} />
                ) : (
                  <FcNumericalSorting12 size={"2rem"} />
                )}
              </DevModeButton>
            </TitleFlex>
            <AdminCardContainer>
              {adminReviewData &&
              adminReviewData.reviews &&
              adminReviewData.reviews.length > 0
                ? adminReviewData.reviews.map((admin, index) => (
                    <AdminReview
                      index={index + 1}
                      key={Object.entries(admin).join()}
                      admin={admin}
                    />
                  ))
                : ""}
            </AdminCardContainer>
          </Flex>
          <Flex direction="row" style={{ flexWrap: "wrap" }}>
            <MaxHeightColumn flexBasis={35}>
              <TitleFlex direction="row">
                <OnePaddedH1>Recent Reviews</OnePaddedH1>
              </TitleFlex>
              <PaddedBottomDiv style={{ fontSize: "16px", lineHeight: "22px" }}>
                Welcome to the app leaderboard. Here you can view hacker
                applications, recent reviews, and a leaderboard of admins based
                on their reviews. If you have any questions or find any errors,
                hit up the engineers in{" "}
                <b>#{new Date().getFullYear()}-engineering</b>
              </PaddedBottomDiv>
              <PaddedBottomDiv style={{ lineHeight: "18px" }}>
                <Flex direction="row" align="center">
                  <Column
                    style={{
                      flexBasis: "auto",
                      width: "fit-content",
                      margin: "0 0 1rem 0",
                    }}
                  >
                    <ScoreKeyLabel
                      onClick={() =>
                        setRefreshRecentReviewCount(recentReviewCount)
                      }
                    >
                      Count
                    </ScoreKeyLabel>
                  </Column>

                  <Column flexGrow={1} style={{ margin: "0 0 1rem 0" }}>
                    <Input
                      type="number"
                      onChange={(e) =>
                        setRecentReviewCount(parseInt(e.target.value))
                      }
                      onKeyPress={(e) =>
                        e.key === "Enter"
                          ? setRefreshRecentReviewCount(recentReviewCount)
                          : ""
                      }
                      value={recentReviewCount}
                    />
                  </Column>
                </Flex>
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
                <OnePaddedH1>Hacker Leaderboard</OnePaddedH1>
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
                  # Hackers:{" "}
                  <GoldColoredText>
                    {reviewProfileData ? reviewProfileData.numHackers : 0}
                  </GoldColoredText>
                </p>
                <p>
                  # Reviews:{" "}
                  <GoldColoredText>
                    {reviewProfileData ? reviewProfileData.numHackerReviews : 0}
                  </GoldColoredText>
                </p>
                <p>
                  # Reviewed Hackers:{" "}
                  <GoldColoredText>
                    {reviewProfileData
                      ? reviewProfileData.numReviewedProfiles
                      : 0}
                  </GoldColoredText>
                </p>
                <p>
                  # Accepted Hackers:{" "}
                  <GreenColoredText>
                    {reviewProfileData
                      ? reviewProfileData.numAcceptedHackers
                      : 0}
                  </GreenColoredText>
                </p>
                <p>
                  # Waitlisted Hackers:{" "}
                  <OrangeColoredText>
                    {reviewProfileData
                      ? reviewProfileData.numWaitlistedHackers
                      : 0}
                  </OrangeColoredText>
                </p>
                <p>
                  # Rejected Hackers:{" "}
                  <RedColoredText>
                    {reviewProfileData
                      ? reviewProfileData.numRejectedHackers
                      : 0}
                  </RedColoredText>
                </p>
              </PaddedBottomDiv>
              <PaddedBottomDiv style={{ lineHeight: "18px" }}>
                <Flex direction="row" align="center">
                  <Column
                    style={{
                      flexBasis: "auto",
                      width: "fit-content",
                      margin: "0 0 1rem 0",
                    }}
                  >
                    <ScoreKeyLabel
                      onClick={() => setRefreshHackerCount(hackerCount)}
                    >
                      Count
                    </ScoreKeyLabel>
                  </Column>

                  <Column flexGrow={1} style={{ margin: "0 0 1rem 0" }}>
                    <Input
                      type="number"
                      onChange={(e) => setHackerCount(parseInt(e.target.value))}
                      onKeyPress={(e) =>
                        e.key === "Enter"
                          ? setRefreshHackerCount(hackerCount)
                          : ""
                      }
                      value={hackerCount}
                    />
                  </Column>
                </Flex>
              </PaddedBottomDiv>
              <CardContainer>
                {reviewProfileData &&
                reviewProfileData.reviewedProfiles &&
                reviewProfileData.reviewedProfiles.length > 0
                  ? reviewProfileData.reviewedProfiles.map((hacker, index) => (
                      <Hacker
                        hackerCount={hackerCount}
                        setHackerCount={setHackerCount}
                        showAcceptButton={true}
                        showRejectButton={true}
                        showWaitlistButton={true}
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
  if (!profile || !(profile.role == "admin" || profile.role == "superadmin")) {
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

const RedColoredText = styled(ColoredText)`
  background-color: #ff9999;
`;

const OrangeColoredText = styled(ColoredText)`
  background-color: #ffc87c;
`;

const MaxHeightColumn = styled(Column)`
  padding: 1rem;
  min-width: 300px;
  max-height: 90vh;
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

const AdminCardContainer = styled(Flex)`
  width: 100%;
  flex: 1 1 auto;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  padding: 1rem;
  box-sizing: border-box;
  overflow-x: scroll;
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

const ScoreKeyLabel = styled(Button)`
  display: inline-block;
  padding: 10px 16px;
  margin-right: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  // color: ${({ theme }) => theme.colors.gray50};
`;

const Input = styled.input`
  border-radius: 8px;
  border: 1px solid #b2b2b2;
  padding: 12px 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

export default AppLeaderboard;

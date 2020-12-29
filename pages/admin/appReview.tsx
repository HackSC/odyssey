import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import {
  getHackerProfileForReview,
  submitReview,
  getReviewHistory,
  getTotalReviewHistory,
  sendSlackMessage,
  handleLoginRedirect,
  getProfile,
} from "../../lib";
import { Head, Navbar, Footer } from "../../components";
import { Button, Container, Background, Flex, Column } from "../../styles";
import { liveLookupFetch } from "../../lib/api-sdk/liveHooks";

const AppReview = ({ profile, hackerProfile, reviewHistory, totalReviews }) => {
  let total_review_len_initial = totalReviews.eligibleReviews
    ? totalReviews.eligibleReviews.length
    : 0;

  const [currentProfile, setCurrentProfile] = useState(hackerProfile);
  const [reviewCount, setReviewCount] = useState(
    reviewHistory ? reviewHistory.length : 0
  );
  const [totalReviewHistory, setTotalReviewHistory] = useState(
    200 - reviewCount
  );
  const [adminCount, setAdminCount] = useState(0);

  useEffect(() => {
    let [firstName, lastName, email] = ["", "", ""];
    liveLookupFetch({ firstName, lastName, email }).then((res) => {
      let profiles = res.success;
      let new_admin_count =
        profiles && profiles.length > 0
          ? profiles.reduce((a, b) => a + (b.role == "admin" ? 1 : 0), 0)
          : 0;

      setAdminCount(new_admin_count);
      setTotalReviewHistory(
        Math.round(
          new_admin_count > 0
            ? total_review_len_initial > 200
              ? (total_review_len_initial / new_admin_count) * 3 - reviewCount
              : 200 - reviewCount
            : 200 - reviewCount
        )
      );
    });
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [loadingNewProfile, setLoadingNewProfile] = useState(false);

  const { addToast } = useToasts();
  const { width, height } = useWindowSize(3000, 3000);

  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");
  const [s3, setS3] = useState("");

  const scoreInputs = [useRef(null), useRef(null), useRef(null)];

  const switchInputsOnKeyDown = useCallback(
    (e) => {
      const { key } = e;

      if (key === "Enter") {
        handleSubmit();
        e.preventDefault();
        return;
      }

      let i =
        key.toLowerCase() === "q"
          ? 0
          : key.toLowerCase() === "w"
          ? 1
          : key.toLowerCase() === "e"
          ? 2
          : -1;

      if (i < 0) return;

      scoreInputs[i].current.focus();
      window.scrollTo({
        left: 0,
        top: scoreInputs[i].current.offsetTop - 50,
        behavior: "smooth",
      });

      e.preventDefault();
    },
    [s1, s2, s3, submitting, loadingNewProfile]
  );

  const handleSubmit = useCallback(
    async (e?) => {
      if (submitting || loadingNewProfile) {
        // Prevent accidental double submission... we shouldn't submit anything until we get server confirmation
        return;
      }

      if (e) {
        e.preventDefault();
      }

      let invalid = false;
      let warning = false;
      if (s1.trim() === "" || s2.trim() === "" || s3.trim() === "") {
        invalid = true;
      }

      const MIN_SCORE = 1,
        MAX_SCORE = 5;

      if (parseInt(s1) < MIN_SCORE || parseInt(s1) > MAX_SCORE) {
        invalid = true;
      }

      if (parseInt(s2) < MIN_SCORE || parseInt(s2) > MAX_SCORE) {
        invalid = true;
      }

      if (parseInt(s3) < MIN_SCORE || parseInt(s3) > MAX_SCORE) {
        invalid = true;
      }

      if (parseInt(s3) == 5) {
        warning = true;
      }

      if (warning) {
        if (
          !confirm(
            "Are you sure you want to red flag this application? - a score of '5' on question 3 indicates a red flag"
          )
        ) {
          return;
        }
      }

      if (invalid) {
        alert("Invalid review data - please try again");
        return;
      }

      const review = {
        userId: currentProfile ? currentProfile.userId : "",
        scoreOne: s1,
        scoreTwo: s2,
        scoreThree: s3,
      };

      setSubmitting(true);
      const result = await submitReview(review);

      if (result) {
        setSubmitting(false);

        // Scroll to top and get new profile
        window.scrollTo({ top: 0, left: 0 });
        setLoadingNewProfile(true);
        const newProfile = await getHackerProfileForReview(null);
        setLoadingNewProfile(false);
        setCurrentProfile(newProfile);
        setS1("");
        setS2("");
        setS3("");
        setReviewCount(reviewCount + 1);
        setTotalReviewHistory(totalReviewHistory - 1);
        if (totalReviewHistory <= 0) {
          let firstName = profile ? profile.firstName : "";
          let lastName = profile ? profile.lastName : "";
          let user_email = profile ? profile.email : "";
          let start_and_end_date =
            new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() + "";
          let slack_result = await sendSlackMessage(
            ":tada: :party_parrot: :white_check_mark: App Reviews Completed (/admin/appReview) by " +
              firstName +
              ", " +
              lastName +
              ", " +
              user_email,
            "Reviews Left: " +
              totalReviewHistory +
              "\nReviews Complete: " +
              reviewCount,
            start_and_end_date,
            start_and_end_date
          );
          addToast("Created Unlockable!", { appearance: "success" });
        }
        scoreInputs[0].current.focus();
      }
    },
    [s1, s2, s3, submitting, loadingNewProfile]
  );

  useEffect(() => {
    // Default to highlighting the first score input
    if (scoreInputs[0] && scoreInputs[0].current) {
      scoreInputs[0].current.focus();
    }
  }, []);

  useEffect(() => {
    // Highlight the right score input based on window keys
    window.addEventListener("keydown", switchInputsOnKeyDown);
    return () => {
      window.removeEventListener("keydown", switchInputsOnKeyDown);
    };
  }, [s1, s2, s3, submitting, loadingNewProfile]);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn admin activePage="/appReview" />
      <Background padding="3rem 1rem">
        <Container style={{ maxWidth: "1000px" }}>
          {totalReviewHistory <= 0 ? (
            <InfoPanel>
              <Confetti
                recycle={false}
                numberOfPieces={500}
                width={width}
                height={height}
              />
              <h2 style={{ textAlign: "center", padding: "0" }}>
                Thank you for your reviews! Enjoy the confetti!
              </h2>
            </InfoPanel>
          ) : (
            ""
          )}
          <InfoPanel>
            <p>
              Before you review, please look at this Quip document which
              outlines the application review rubric:{" "}
              <a
                href="https://quip.com/ya1oAGhDpIvz/Application-Review-Rubric-Instructions"
                target="_blank"
              >
                READ ME
              </a>
            </p>

            <br />

            <p>
              You have reviewed <b>{reviewCount}</b> applications.
            </p>

            <p>
              Please review <b>{totalReviewHistory}</b> more applications.
            </p>
          </InfoPanel>

          <Flex
            direction="row"
            justify="space-between"
            style={{ flexWrap: "nowrap" }}
          >
            <Column flexBasis={70} style={{ margin: "0 2rem 0 0" }}>
              <h1> Applicant Info </h1>
              <Panel>
                <h2>Question 1 - Vertical</h2>
                <BrokenP>
                  {" "}
                  {loadingNewProfile
                    ? "Loading..."
                    : currentProfile
                    ? currentProfile.questionOne
                    : "(No response)"}{" "}
                </BrokenP>
              </Panel>

              <Panel>
                <h2>Question 2 - Project</h2>
                <BrokenP>
                  {" "}
                  {loadingNewProfile
                    ? "Loading..."
                    : currentProfile
                    ? currentProfile.questionTwo
                    : "(No response)"}{" "}
                </BrokenP>
              </Panel>

              <Panel>
                <h2>Question 3 - Beverage</h2>
                <BrokenP>
                  {" "}
                  {loadingNewProfile
                    ? "Loading..."
                    : currentProfile
                    ? currentProfile.questionThree
                    : "(No response)"}{" "}
                </BrokenP>
              </Panel>

              <h1>Resume</h1>
              <a
                href={currentProfile ? currentProfile.resume : "/"}
                target="_blank"
              >
                Download Pdf
              </a>
              <div style={{ padding: "2rem 0" }}>
                <iframe
                  style={{
                    width: "100%",
                    minWidth: "320px",
                    minHeight: "620px",
                  }}
                  src={`https://hacksc-odyssey.s3-us-west-1.amazonaws.com/${
                    currentProfile ? currentProfile.userId : ""
                  }#zoom=50`}
                />
              </div>
            </Column>

            <Column flexBasis={40}>
              <h1>Review</h1>
              <Panel>
                <ScoreInputLabel>Score 1 (1-5)</ScoreInputLabel>

                <Flex
                  direction="row"
                  justify="space-between"
                  align="center"
                  style={{ flexWrap: "wrap" }}
                >
                  <Column style={{ margin: "0 0 1rem 0" }}>
                    <ScoreKeyLabel>Q</ScoreKeyLabel>
                  </Column>

                  <Column flexGrow={1} style={{ margin: "0 0 1rem 0" }}>
                    <Input
                      type="number"
                      onChange={(e) => {
                        setS1(e.target.value);
                      }}
                      value={s1}
                      ref={scoreInputs[0]}
                    />
                  </Column>
                </Flex>
              </Panel>

              <Panel>
                <ScoreInputLabel>Score 2 (1-5)</ScoreInputLabel>

                <Flex
                  direction="row"
                  justify="space-between"
                  align="center"
                  style={{ flexWrap: "wrap" }}
                >
                  <Column style={{ margin: "0 0 1rem 0" }}>
                    <ScoreKeyLabel>W</ScoreKeyLabel>
                  </Column>

                  <Column flexGrow={1} style={{ margin: "0 0 1rem 0" }}>
                    <Input
                      type="number"
                      onChange={(e) => {
                        setS2(e.target.value);
                      }}
                      value={s2}
                      ref={scoreInputs[1]}
                    />
                  </Column>
                </Flex>
              </Panel>

              <Panel>
                <ScoreInputLabel>Score 3 (1-5)</ScoreInputLabel>

                <Flex
                  direction="row"
                  justify="space-between"
                  align="center"
                  style={{ flexWrap: "wrap" }}
                >
                  <Column style={{ margin: "0 0 1rem 0" }}>
                    <ScoreKeyLabel>E</ScoreKeyLabel>
                  </Column>

                  <Column flexGrow={1} style={{ margin: "0 0 1rem 0" }}>
                    <Input
                      type="number"
                      onChange={(e) => {
                        setS3(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        if (e.key === "e") {
                          e.preventDefault();
                        }
                      }}
                      value={s3}
                      ref={scoreInputs[2]}
                    />
                  </Column>
                </Flex>
              </Panel>

              <div>
                <StyledButton onClick={handleSubmit} disabled={submitting}>
                  {" "}
                  Submit Review (↵){" "}
                </StyledButton>

                {submitting && <SubmittingText>Submitting...</SubmittingText>}
              </div>
            </Column>
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

AppReview.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || !(profile.role == "admin" || profile.role == "superadmin")) {
    handleLoginRedirect(req);
  }
  const profileReview = await getHackerProfileForReview(req);
  const reviewHistory = await getReviewHistory(req);
  const totalReviews = await getTotalReviewHistory(req);
  return {
    profile,
    hackerProfile: profileReview,
    reviewHistory,
    totalReviews,
  };
};

const BrokenP = styled.p`
  word-break: break-all;
`;

const Panel = styled.div`
  padding: 24px 36px;
  margin: 0 0 16px;
  background: #ffffff;
  border-radius: 4px;
`;

const InfoPanel = styled(Panel)`
  margin-bottom: 32px;
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

const ScoreInputLabel = styled.h3`
  padding: 0;
  margin-bottom: 8px;
`;

const ScoreKeyLabel = styled.p`
  display: inline-block;
  padding: 10px 16px;
  margin-right: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  color: ${({ theme }) => theme.colors.gray50};
`;

const StyledButton = styled(Button)`
  ${({ disabled }) => disabled && `opacity: 0.5`};
`;

const SubmittingText = styled.p`
  margin-top: 8px;
`;

export default AppReview;

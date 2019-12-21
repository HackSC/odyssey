import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import {
  getHackerProfileForReview,
  submitReview,
  getReviewHistory
} from "../lib/admin";
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Container, Background, Flex, Column } from "../styles";

const AppReview = ({ hackerProfile, reviewHistory }) => {
  const [s1, setS1] = useState(null);
  const [s2, setS2] = useState(null);
  const [s3, setS3] = useState(null);
  const [comments, setComments] = useState("");

  const scoreInputs = [useRef(null), useRef(null), useRef(null)];

  const switchInputsOnKeyDown = useCallback(
    e => {
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
        behavior: "smooth"
      });

      e.preventDefault();
    },
    [s1, s2, s3]
  );

  const handleSubmit = useCallback(
    async (e?) => {
      if (e) {
        e.preventDefault();
      }

      let invalid = false;
      if (s1 === null || s2 === null || s3 === null) {
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

      if (invalid) {
        alert("Invalid review data - please try again");
        return;
      }

      const review = {
        userId: hackerProfile.userId,
        scoreOne: s1,
        scoreTwo: s2,
        scoreThree: s3,
        comments: comments
      };
      const result = await submitReview(review);

      // Refresh page lol
      window.scrollTo({ top: 0, left: 0 });
      location.reload();
    },
    [s1, s2, s3]
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
  }, [s1, s2, s3]);

  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn admin activePage="/" />
      <Background>
        <Container>
          <InfoPanel>
            <p>
              Before you review, please look at this Quip document which
              outlines the application review rubric:{" "}
              <a
                href="https://quip.com/szj7AiMJRTad/Application-Review-Rubric-Instructions"
                target="_blank"
              >
                READ_ME
              </a>
            </p>

            <br />

            <p>
              You have reviewed{" "}
              <b>{reviewHistory ? reviewHistory.length : 0}/200</b>{" "}
              applications.
            </p>
          </InfoPanel>

          <Flex direction="row" justify="space-between">
            <Column flexBasis={48}>
              <h1> Applicant Info </h1>
              <Panel>
                <h2>Question 1 - Vertical</h2>
                <p> {hackerProfile.questionOne || "(No response)"} </p>
              </Panel>

              <Panel>
                <h2>Question 2 - Project</h2>
                <p> {hackerProfile.questionTwo || "(No response)"} </p>
              </Panel>

              <Panel>
                <h2>Question 3 - Beverage</h2>
                <p> {hackerProfile.questionThree || "(No response)"} </p>
              </Panel>
            </Column>

            <Column flexBasis={48}>
              <h1>Review</h1>
              <Panel>
                <ScoreInputLabel>Score 1 (1-5)</ScoreInputLabel>

                <Flex direction="row" justify="space-between" align="center">
                  <Column>
                    <ScoreKeyLabel>Q</ScoreKeyLabel>
                  </Column>

                  <Column flexGrow={1}>
                    <Input
                      type="number"
                      onChange={e => {
                        setS1(e.target.value);
                      }}
                      ref={scoreInputs[0]}
                    />
                  </Column>
                </Flex>
              </Panel>

              <Panel>
                <ScoreInputLabel>Score 2 (1-5)</ScoreInputLabel>

                <Flex direction="row" justify="space-between" align="center">
                  <Column>
                    <ScoreKeyLabel>W</ScoreKeyLabel>
                  </Column>

                  <Column flexGrow={1}>
                    <Input
                      type="number"
                      onChange={e => {
                        setS2(e.target.value);
                      }}
                      ref={scoreInputs[1]}
                    />
                  </Column>
                </Flex>
              </Panel>

              <Panel>
                <ScoreInputLabel>Score 3 (1-5)</ScoreInputLabel>

                <Flex direction="row" justify="space-between" align="center">
                  <Column>
                    <ScoreKeyLabel>E</ScoreKeyLabel>
                  </Column>

                  <Column flexGrow={1}>
                    <Input
                      type="number"
                      onChange={e => {
                        setS3(e.target.value);
                      }}
                      onKeyUp={e => {
                        if (e.key === "e") {
                          e.preventDefault();
                        }
                      }}
                      ref={scoreInputs[2]}
                    />
                  </Column>
                </Flex>
              </Panel>
              <div>
                <Button onClick={handleSubmit}> Submit Review (↵) </Button>
              </div>
            </Column>
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

AppReview.getInitialProps = async ctx => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || profile.role !== "admin") {
    handleLoginRedirect(req);
  }
  const profileReview = await getHackerProfileForReview(req);
  const reviewHistory = await getReviewHistory(req);
  return {
    hackerProfile: profileReview,
    reviewHistory
  };
};

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

export default AppReview;

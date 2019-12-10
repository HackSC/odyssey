import React, { useState } from "react";
import styled from "styled-components";

import {
  handleLoginRedirect,
  getProfile,
  handleAdminRedirect
} from "../lib/authenticate";

import { getHackerProfileForReview, submitReview } from "../lib/admin";
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Container, Background, Flex, Column } from "../styles";

const AppReview = ({ hackerProfile, review }) => {
  console.log(hackerProfile);
  console.log(review);

  const [s1, setS1] = useState(null);
  const [s2, setS2] = useState(null);
  const [s3, setS3] = useState(null);
  const [comments, setComments] = useState("");

  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn admin activePage="/" />
      <Background>
        <Container>
          <Flex direction="row" justify="space-between">
            <Column flexBasis={48}>
              <h1> Applicant Info </h1>

              <Panel>
                <h2>Question 1 - Project</h2>
                <p> {hackerProfile.questionOne || "(No response)"} </p>
              </Panel>

              <Panel>
                <h2>Question 2 - Vertical</h2>
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
                <Flex direction="row" justify="space-between" align="center">
                  <Column>
                    <ScoreInputLabel>Score 1</ScoreInputLabel>
                  </Column>

                  <Column flexGrow={1}>
                    <Input
                      type="number"
                      onChange={e => {
                        setS1(e.target.value);
                      }}
                    />
                  </Column>
                </Flex>
              </Panel>

              <Panel>
                <Flex direction="row" justify="space-between" align="center">
                  <Column>
                    <ScoreInputLabel>Score 2</ScoreInputLabel>
                  </Column>

                  <Column flexGrow={1}>
                    <Input
                      type="number"
                      onChange={e => {
                        setS2(e.target.value);
                      }}
                    />
                  </Column>
                </Flex>
              </Panel>

              <Panel>
                <Flex direction="row" justify="space-between" align="center">
                  <Column>
                    <ScoreInputLabel>Score 3</ScoreInputLabel>
                  </Column>

                  <Column flexGrow={1}>
                    <Input
                      type="number"
                      onChange={e => {
                        setS3(e.target.value);
                      }}
                    />
                  </Column>
                </Flex>
              </Panel>
              <div>
                <Button
                  onClick={async e => {
                    e.preventDefault();
                    const result = await submitReview(review, {
                      scoreOne: s1,
                      scoreTwo: s2,
                      scoreThree: s3
                    });
                    // Redirect back to admin from the server
                    handleAdminRedirect(null);
                  }}
                >
                  {" "}
                  Submit Review{" "}
                </Button>
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
  return {
    hackerProfile: profileReview.profile,
    review: profileReview.review
  };
};

const Panel = styled.div`
  padding: 24px 36px;
  margin: 0 0 16px;
  background: #ffffff;
  border-radius: 4px;
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
  margin-right: 32px;
`;

export default AppReview;

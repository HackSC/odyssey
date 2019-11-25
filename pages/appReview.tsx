import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import { getHackerProfileForReview, submitReview } from "../lib/admin";
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Container, Background } from "../styles";

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
      <Container>
        <Background>
          <h1> Applicant Info </h1>
          <h2> Question 1 </h2>
          <p> {hackerProfile.questionOne} </p>
          <h2> Question 2 </h2>
          <p> {hackerProfile.questionTwo} </p>
          <h2> Question 3 </h2>
          <p> {hackerProfile.questionThree} </p>
        </Background>
        <Background>
          <h1> Review </h1>
          <h3> Score 1 </h3>
          <input
            type="number"
            onChange={e => {
              setS1(e.target.value);
            }}
          />
          <h3> Score 2 </h3>
          <input
            type="number"
            onChange={e => {
              setS2(e.target.value);
            }}
          />
          <h3> Score 3 </h3>
          <input
            type="number"
            onChange={e => {
              setS3(e.target.value);
            }}
          />
          <div>
            <button
              onClick={async () => {
                const result = submitReview(review, {
                  scoreOne: s1,
                  scoreTwo: s2,
                  scoreThree: s3
                });
              }}
            >
              {" "}
              Submit Review{" "}
            </button>
          </div>
        </Background>
      </Container>

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

export default AppReview;

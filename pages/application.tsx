import React from "react";
import { GetServerSideProps } from "next";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  handleLoginRedirect,
  getProfile,
  handleAdminRedirect,
  handleVolunteerRedirect,
  handleSponsorRedirect,
  handleJudgeRedirect,
} from "../lib/authenticate";

import { Head, Navbar, Footer, Steps } from "../components";

import { Background, Container } from "../styles";

import { generatePosts } from "../lib/referrerCode";
import { getHouses } from "../lib";
import useSWR from "swr";
import hackathonConstants from "../lib/hackathonConstants";

const Application = ({ profile, houses, socialPosts, appsOpen }) => {
  let fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/profile"
    : "api/profile";

  let { data: hackerProfile, error: reviewProfileError } = useSWR(
    fetchUrl,
    fetch,
    { refreshInterval: 1000 }
  );

  return (
    <>
      <Head title="HackSC Dashboard - Application" />
      <Navbar
        showProjectTeam={profile ? profile.status === "checkedIn" : false}
        loggedIn
        activePage="application"
      />
      <Background padding={"0.5em"}>
        {profile && (
          <Container>
            <Steps
              houses={houses}
              profile={profile}
              socialPosts={socialPosts}
              appsOpen={appsOpen}
            />
          </Container>
        )}
      </Background>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const profile = await getProfile(req);
  let houses = await getHouses(req);
  const { appsCloseDate } = hackathonConstants;

  const threeDaysAfterClose = new Date(appsCloseDate);
  threeDaysAfterClose.setDate(threeDaysAfterClose.getDate() + 3);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  } else if (profile.role == "admin" || profile.role == "superadmin") {
    handleAdminRedirect(req);
  } else if (profile.role == "volunteer") {
    handleVolunteerRedirect(req);
  } else if (profile.role == "sponsor") {
    handleSponsorRedirect(req);
  } else if (profile.role == "judge") {
    handleJudgeRedirect(req);
  }

  if (profile && profile.status == "checkedIn") {
    //houses = await getHouseInfo(req, 1); getHouses
  }

  /*
  Configure Sentry on the Live Page
  if (typeof window !== "undefined") {
    Sentry.configureScope(function(scope) {
      scope.setExtra("profile", profile);
    });
  }
  */

  let socialPosts = {};
  if (profile) {
    socialPosts = generatePosts(profile);
  }

  return {
    props: {
      houses,
      profile,
      socialPosts,
      appsOpen: threeDaysAfterClose.getTime() > Date.now(),
    },
  };
};

export default Application;

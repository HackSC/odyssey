import React from "react";
import * as Sentry from "@sentry/browser";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  Head,
  Navbar,
  Hero,
  Footer,
  Countdown,
  LinkToSchedule,
  LinksAndTasks,
} from "../components";

import { Container } from "../styles";
import { generatePosts } from "../lib/referrerCode";

import {
  handleLoginRedirect,
  getProfile,
  handleAdminRedirect,
  handleVolunteerRedirect,
  handleSponsorRedirect,
  handleDashboardRedirect,
  handleApplicationRedirect,
} from "../lib/authenticate";
import hackathonConstants from "../lib/hackathonConstants";

const Live = ({ profile, houses, socialPosts }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Live Dashboard" />
      <Navbar
        loggedIn
        showProjectTeam={profile.status === "checkedIn"}
        activePage="live"
      />
      <Container>
        <Countdown />
        {/* <LinkToSchedule /> */}
        <LinksAndTasks />
      </Container>
      <Footer />
    </>
  );
};

Live.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const houses = [];

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  } else if (profile.role == "admin") {
    handleAdminRedirect(req);
  } else if (profile.role == "volunteer") {
    handleVolunteerRedirect(req);
  } else if (profile.role == "sponsor") {
    handleSponsorRedirect(req);
  }

  if (profile && !hackathonConstants.showLive) {
    // Redirect user to dashboard if they are logged in
    handleApplicationRedirect(req);
  }

  if (profile && profile.status == "checkedIn") {
    //const houseInfo = await getHouseInfo(req, 1);
    //console.log(houseInfo);
  }

  if (typeof window !== "undefined") {
    Sentry.configureScope(function (scope) {
      scope.setExtra("profile", profile);
    });
  }

  let socialPosts = {};
  if (profile) {
    socialPosts = generatePosts(profile);
  }

  return {
    houses,
    profile,
    socialPosts,
  };
};

export default Live;

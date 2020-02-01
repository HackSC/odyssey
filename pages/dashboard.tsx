import React from "react";
import * as Sentry from "@sentry/browser";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  handleLoginRedirect,
  getProfile,
  handleAdminRedirect,
  handleVolunteerRedirect,
  handleSponsorRedirect
} from "../lib/authenticate";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Background, Container } from "../styles";

import Steps from "../components/LiveDashboard";

import { generatePosts } from "../lib/referrerCode";

const Dashboard = ({ profile, houses, socialPosts }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Dashboard" />
      <Navbar
        showApp={false}
        showResults={false}
        showTeam={false}
        showProjectTeam={profile.status === "checkedIn"}
        loggedIn
        activePage="dashboard"
      />
      <Background padding={"0.5em"}>
        {profile && (
          <Container>
            {profile && (
              <Steps
                houses={houses}
                profile={profile}
                socialPosts={socialPosts}
              />
            )}
          </Container>
        )}
      </Background>
      <Footer />
    </>
  );
};

Dashboard.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  //const houses = await getHouses(req);
  const houses = [];
  //console.log(req);

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

  if (profile && profile.status == "checkedIn") {
    //const houseInfo = await getHouseInfo(req, 1);
    //console.log(houseInfo);
  }

  if (typeof window !== "undefined") {
    Sentry.configureScope(function(scope) {
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
    socialPosts
  };
};

export default Dashboard;

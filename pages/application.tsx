import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {
  handleLoginRedirect,
  getProfile,
  handleAdminRedirect,
  handleVolunteerRedirect,
  handleSponsorRedirect,
} from "../lib/authenticate";

import { Head, Navbar, Footer, Steps } from "../components";

import { Background, Container } from "../styles";

import { generatePosts } from "../lib/referrerCode";

const Application = ({ profile, houses, socialPosts }) => {
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
            />
          </Container>
        )}
      </Background>
      <Footer />
    </>
  );
};

Application.getInitialProps = async ({ req }) => {
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
    houses,
    profile,
    socialPosts,
  };
};

export default Application;

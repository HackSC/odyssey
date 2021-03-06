import React from "react";
import * as Sentry from "@sentry/browser";

import { Head, Navbar, DirectoryIntro, Directory, Footer } from "../components";

import { Container } from "../styles";
import { generatePosts } from "../lib/referrerCode";

import {
  handleLoginRedirect,
  getProfile,
  handleAdminRedirect,
  handleVolunteerRedirect,
  handleSponsorRedirect,
  getAPIS,
} from "../lib/authenticate";

const API = ({ apis, profile, houses, socialPosts }) => {
  return (
    <>
      <Head title="HackSC Dashboard - API Directory" />
      <Navbar
        loggedIn
        showProjectTeam={profile ? profile.status === "checkedIn" : false}
        activePage="api"
      />
      <Container>
        <DirectoryIntro />
        <Directory apis={apis ? apis : []} />
      </Container>
      <Footer />
    </>
  );
};

API.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const houses = [];
  const apis = await getAPIS(req);

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
    apis,
    houses,
    profile,
    socialPosts,
  };
};

export default API;

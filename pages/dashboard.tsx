import { useState } from "react";
import Dash from "../components/hackerDashboard/Dashboard";
import AdminDashboard from "../components/hackerDashboard/AdminDashboard";

import {
  handleLoginRedirect,
  getProfile,
  handleAdminRedirect,
  handleVolunteerRedirect,
  handleSponsorRedirect,
  handleDashboardRedirect,
  getHackathonConstants,
  generatePosts,
} from "@/lib";

const Dashboard = ({ profile, houses, socialPosts }) => {
  const [view, setView] = useState("hacker");

  const switchRole = () => {
    if (view === "admin") {
      setView("hacker");
    } else {
      setView("admin");
    }
  };

  const getDashToRender = () => {
    //@ts-ignore  - the NODE_ENV var doesnt support dev
    if (view === "admin") {
      return <AdminDashboard profile={profile} />;
    } else {
      return <Dash profile={profile} />;
    }
  };

  return (
    <>
      <button
        onClick={switchRole}
        style={{ position: "absolute", top: 10, right: "50%" }}
      >
        Switch role
      </button>
      {getDashToRender()}
    </>
  );
};

export async function getServerSideProps({ req }) {
  const profile = await getProfile(req);
  const hackathonConstants = await getHackathonConstants();
  const houses = [];

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  } else if (profile.role == "admin") {
    // handleAdminRedirect(req);
  } else if (profile.role == "volunteer") {
    handleVolunteerRedirect(req);
  } else if (profile.role == "sponsor") {
    handleSponsorRedirect(req);
  }

  if (
    !hackathonConstants.find((constant) => constant.name === "showDash")
      ?.boolean
  ) {
    await handleDashboardRedirect(req);
  }

  let socialPosts = {};
  if (profile) {
    socialPosts = generatePosts(profile);
  }

  return {
    props: {
      houses,
      profile,
      socialPosts,
    },
  };
}

export default Dashboard;

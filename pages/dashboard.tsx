import { useState } from "react";
import {
  Dash,
  AdminDashboard,
  SponsorDashboard,
} from "@/components/hackerDashboard";
import getTeam from "../lib/api-sdk/getTeam";

import {
  handleLoginRedirect,
  getProfile,
  handleVolunteerRedirect,
  handleSponsorRedirect,
  handleDashboardRedirect,
  getHackathonConstants,
  generatePosts,
  getPublicEvents,
} from "@/lib";

const Dashboard = ({ profile, events, hackathonConstants, team }) => {
  const [view, setView] = useState("hacker");

  const switchRole = () => {
    if (view === "admin") {
      setView("hacker");
    } else if (view === "hacker") {
      setView("sponsor");
    } else if (view === "sponsor") {
      setView("admin");
    }
  };

  const getDashToRender = () => {
    if (view === "admin") {
      return (
        <AdminDashboard
          profile={profile}
          events={events}
          hackathonConstants={hackathonConstants}
        />
      );
    } else if (view === "sponsor") {
      return (
        <SponsorDashboard
          profile={profile}
          events={events}
          hackathonConstants={hackathonConstants}
        />
      );
    } else {
      return (
        <Dash
          team={team}
          profile={profile}
          events={events}
          hackathonConstants={hackathonConstants}
        />
      );
    }
  };

  return (
    <>
      {process.env.NODE_ENV === "development" ? (
        <button
          onClick={switchRole}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          Switch role
        </button>
      ) : (
        ""
      )}
      {getDashToRender()}
    </>
  );
};

export async function getServerSideProps({ req }) {
  const profile = await getProfile(req);
  const hackathonConstants = await getHackathonConstants();
  const currentEvents = await getPublicEvents(req);
  const team = await getTeam(req);

  const events = currentEvents ? currentEvents["events"] : [];

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
      team,
      events,
      hackathonConstants,
    },
  };
}

export default Dashboard;

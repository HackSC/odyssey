import { useState, useEffect } from "react";
import { Head } from "@/components";
import getTeam from "../lib/api-sdk/getTeam";
import {
  Dash,
  AdminDashboard,
  SponsorDashboard,
} from "@/components/hackerDashboard";

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

// import { getHackathonConstants } from "../lib";

import { getAnnouncements } from "../lib/getAnnouncements";

// import { generatePosts } from "../lib/referrerCode";

const Dashboard = ({
  profile,
  events,
  hackathonConstants,
  announcements,
  // view,
  team,
}) => {
  const [view, setView] = useState(profile.role || "hacker");

  useEffect(() => {
    if (!profile.slackProfile && profile.role === "hacker") {
      setTimeout(function () {
        alert(
          "Welcome to HackSC 2021! Please check in by using the /checkin [your hacksc.com email login] command in any Slack channel."
        );
      }, 500);
    }
  }, []);

  const getDashToRender = () => {
    if (view === "admin" || view == "superadmin") {
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
          announcements={announcements}
        />
      );
    } else {
      return (
        <Dash
          team={team}
          profile={profile}
          events={events}
          hackathonConstants={hackathonConstants}
          announcements={announcements}
        />
      );
    }
  };

  return (
    <>
      <Head title="HackSC Dashboard - Welcome to HackSC 2021" />
      {getDashToRender()}
    </>
  );
};

export async function getServerSideProps({ req }) {
  const profile = await getProfile(req);
  const announcements = await getAnnouncements(req, profile);
  const hackathonConstants = await getHackathonConstants();
  const currentEvents = await getPublicEvents(req);
  const team = await getTeam(req);
  const events = currentEvents ? currentEvents["events"] : [];

  const view = profile ? profile.role : "hacker";
  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  return {
    props: {
      profile,
      team,
      announcements,
      events,
      hackathonConstants,
      view,
    },
  };
}

export default Dashboard;

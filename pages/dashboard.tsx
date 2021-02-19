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
  houses,
  events,
  socialPosts,
  hackathonConstants,
  announcements,
  // view,
  team,
}) => {
  const [view, setView] = useState("hacker");

  useEffect(() => {
    if (!profile.slackProfile) {
      setTimeout(function () {
        alert(
          "Welcome to HackSC 2021! Please check in by using the /checkin [your hacksc.com email login] command in any Slack channel."
        );
      }, 500);
    }
  }, []);

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
  //const houses = await getHouses(req);
  const announcements = await getAnnouncements(req, profile);
  const hackathonConstants = await getHackathonConstants();
  const currentEvents = await getPublicEvents(req);
  const team = await getTeam(req);
  console.log(currentEvents);
  const events = currentEvents ? currentEvents["events"] : [];
  const houses = [];
  const view = profile.role;

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  } else if (profile.role == "admin") {
    // handleAdminRedirect(req);
  } else if (profile.role == "volunteer") {
    handleVolunteerRedirect(req);
  } else if (profile.role == "sponsor") {
    // handleSponsorRedirect(req);
  }

  if (
    !hackathonConstants.find((constant) => constant.name === "showDash")
      ?.boolean
  ) {
    //await handleDashboardRedirect(req);
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
      announcements,
      events,
      hackathonConstants,
      view,
    },
  };
}

export default Dashboard;

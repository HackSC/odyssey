import Live from "./live";
import Dash from "../components/hackerDashboard/dashboard";

import {
  handleLoginRedirect,
  getProfile,
  handleAdminRedirect,
  handleVolunteerRedirect,
  handleSponsorRedirect,
  handleDashboardRedirect,
} from "../lib/authenticate";

import constants from "../lib/hackathonConstants";

import { generatePosts } from "../lib/referrerCode";

const Dashboard = ({ profile, houses, socialPosts }) => {
  return <Dash />;
};

export async function getServerSideProps({ req }) {
  const profile = await getProfile(req);
  //const houses = await getHouses(req);
  const houses = [];
  //console.log(req);

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

  if (!constants.showDash) {
    handleDashboardRedirect(req);
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

import Live from "./admin/live";
import {
  handleLoginRedirect,
  getProfile,
  handleAdminRedirect,
  handleVolunteerRedirect,
  handleSponsorRedirect,
  handleDashboardRedirect,
  getHackathonConstants,
  generatePosts,
} from "../lib";

const Dashboard = ({ profile, houses, socialPosts }) => {
  return <Live profile={profile} houses={houses} socialPosts={socialPosts} />;
};

Dashboard.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const hackathonConstants = await getHackathonConstants();
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

  if (
    hackathonConstants.find((constant) => constant.name === "showDash")?.boolean
  ) {
    handleDashboardRedirect(req);
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

export default Dashboard;

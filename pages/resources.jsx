import { ResourcesDash } from "@/components/hackerDashboard";

import {
  handleLoginRedirect,
  getProfile,
  handleDashboardRedirect,
  getHackathonConstants,
  getPublicEvents,
} from "@/lib";

const Resources = ({ profile, events, hackathonConstants }) => {
  return (
    <>
      <ResourcesDash
          profile={profile}
          events={events}
          hackathonConstants={hackathonConstants}
      />
    </>
  );
};

export async function getServerSideProps({ req }) {
  const profile = await getProfile(req);
  const hackathonConstants = await getHackathonConstants();
  const currentEvents = await getPublicEvents(req);
  const events = currentEvents ? currentEvents["events"] : [];

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  if (
    !hackathonConstants.find((constant) => constant.name === "showDash")
      ?.boolean
  ) {
    await handleDashboardRedirect(req);
  }

  return {
    props: {
      profile,
      events,
      hackathonConstants,
    },
  };
}

export default Resources;

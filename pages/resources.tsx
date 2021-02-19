import { ResourcesDash } from "@/components/hackerDashboard";
import { Head } from "@/components";

import {
  handleLoginRedirect,
  getProfile,
  handleDashboardRedirect,
  getHackathonConstants,
  getPublicEvents,
  getAPIS,
} from "@/lib";

const Resources = ({ profile, events, hackathonConstants, resources }) => {
  return (
    <>
      <Head title="HackSC Dashboard - Resources" />
      <ResourcesDash
        profile={profile}
        events={events}
        hackathonConstants={hackathonConstants}
        resources={resources}
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

  const apis = await getAPIS(req);
  //@ts-ignore TODO: FIX
  const resources = apis.success;

  return {
    props: {
      profile,
      events,
      hackathonConstants,
      resources,
    },
  };
}

export default Resources;

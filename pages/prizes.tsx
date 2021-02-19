import { PrizeDash } from "@/components/hackerDashboard";

import {
  handleLoginRedirect,
  getProfile,
  handleDashboardRedirect,
  getHackathonConstants,
  getPrizes,
  getPublicEvents,
} from "@/lib";

import { Head } from "@/components";

const Prizes = ({ profile, events, prizes, hackathonConstants }) => {
  return (
    <>
      <Head title="HackSC Dashboard - Prizes" />
      <PrizeDash
        profile={profile}
        hackathonConstants={hackathonConstants}
        prizes={prizes}
        events={events}
      />
    </>
  );
};

export async function getServerSideProps({ req }) {
  const profile = await getProfile(req);
  const hackathonConstants = await getHackathonConstants();
  const { success: prizes } = await getPrizes(req);
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
      hackathonConstants,
      prizes,
      events,
    },
  };
}

export default Prizes;

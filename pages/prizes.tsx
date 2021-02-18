import { PrizeDash } from "@/components/hackerDashboard";

import {
  handleLoginRedirect,
  getProfile,
  handleDashboardRedirect,
  getHackathonConstants,
  getPrizes,
} from "@/lib";

const Prizes = ({ profile, prizes, hackathonConstants }) => {
  return (
    <>
      <PrizeDash
        profile={profile}
        hackathonConstants={hackathonConstants}
        prizes={prizes}
      />
    </>
  );
};

export async function getServerSideProps({ req }) {
  const profile = await getProfile(req);
  const hackathonConstants = await getHackathonConstants();
  const { success: prizes } = await getPrizes(req);

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
    },
  };
}

export default Prizes;

import React from "react";

import { Head, Navbar, Footer, Maps } from "../components";
import { Background, Container } from "../styles";
import { handleLoginRedirect, getProfile } from "../lib/authenticate";

type Props = {
  projectTeam: ProjectTeam;
  allPrizes: Prize[];
  profile: Profile;
};

const MapsPage = (props: Props) => {
  let { profile } = props;

  return (
    <>
      <Head title="HackSC Odyssey - Team Setup" />
      <Navbar
        loggedIn
        showProjectTeam={profile?.status === "checkedIn"}
        activePage="maps"
      />
      <Background>
        <Container>
          <Maps />
        </Container>
      </Background>
      <Footer />
    </>
  );
};

MapsPage.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  return { profile };
};

export default MapsPage;

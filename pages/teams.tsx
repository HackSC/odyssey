import React from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Background, Container } from "../styles";

const Teams = ({ profile }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Teams" />
      <Navbar loggedIn activePage="Teams" />
      <Background>
        <Container>
          <h1>Teams</h1>

          {profile.team ? (
            <div>
              <p>{profile.team.name}</p>
              <p>{profile.team.teamCode}</p>
            </div>
          ) : (
            <div>
              <p>Join a team</p>

              <p>Create a team</p>

              <input type="text" name="team-name" />
            </div>
          )}
        </Container>
      </Background>
      <Footer />
    </>
  );
};

Teams.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  return {
    profile
  };
};

export default Teams;

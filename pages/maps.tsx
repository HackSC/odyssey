import React from "react";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Background, Container } from "../styles";
import Maps from "../components/Maps";

type Props = {
  projectTeam: ProjectTeam;
  allPrizes: Prize[];
};

const MapsPage = (props: Props) => {
  return (
    <>
      <Head title="HackSC Odyssey - Team Setup" />
      <Navbar
        loggedIn
        showApp={false}
        showResults={false}
        showTeam={false}
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

export default MapsPage;

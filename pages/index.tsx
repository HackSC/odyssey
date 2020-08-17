import React from "react";
import { getUser, handleDashboardRedirect } from "../lib/authenticate";

import { Head, Hero, Footer, Navbar } from "../components";

import { Container } from "../styles";

const Home = () => {
  return (
    <>
      <Head title="HackSC Odyssey - Apply to HackSC 2020" />
      <Navbar activePage="/" />
      <Container>
        <Hero />
      </Container>
      <Footer />
    </>
  );
};

Home.getInitialProps = async ({ req }) => {
  let user = null;
  try {
    user = await getUser(req);
  } catch (e) {
    // * IGNORE
  } finally {
    if (user) {
      // Redirect user to dashboard if they are logged in
      handleDashboardRedirect(req);
    }
  }
};

export default Home;

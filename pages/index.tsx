import React from "react";
import { getUser, handleDashboardRedirect } from "../lib/authenticate";

import { Head, Hero, Footer, Navbar } from "../components";

import { Container } from "../styles";
import useSWR from "swr";

const Home = () => {
  let fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/profile"
    : "api/admin/reviewedProfiles";

  let { data: hackerProfile, error: reviewProfileError } = useSWR(
    fetchUrl,
    fetch,
    { refreshInterval: 1000 }
  );

  return (
    <>
      <Head title="HackSC Dashboard - Apply to HackSC 2021" />
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

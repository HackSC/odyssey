import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

import { FcNumericalSorting12, FcNumericalSorting21 } from "react-icons/fc";
import {
  Head,
  Navbar,
  Footer,
  AppReview,
  Hacker,
  AdminReview,
} from "../../components";
import { Background, Flex, Container, Column, Button } from "../../styles";
import { handleLoginRedirect, getProfile } from "../../lib";

const Tickets = ({ profile }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tickets, setTickets] = useState("0");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const giveTickets = async (e) => {
    e.preventDefault();
    const postUrl = process.env.URL_BASE
      ? process.env.URL_BASE + "api/admin/giveTickets"
      : "api/admin/giveTickets";
    const body = {
      tickets: tickets,
      firstName: firstName ? firstName : undefined,
      lastName: lastName ? lastName : undefined,
      email: email ? email : undefined,
    };

    const response = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    try {
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setSuccess(false);
      } else {
        setError("");
        setSuccess(true);
      }
      return data;
    } catch (e) {
      return null;
    }
  };

  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar
        loggedIn
        admin
        superadmin={profile.role === "superadmin"}
        activePage="/appLeaderboard"
      />
      <Background padding="2rem">
        <Container width={"100%"}>
          <Flex
            direction="column"
            style={{ padding: "1rem 0", flexWrap: "wrap" }}
          >
            <TitleFlex direction="row">
              <OnePaddedH1>Raffle Ticket Manager</OnePaddedH1>
            </TitleFlex>
            <form onSubmit={giveTickets}>
              Input both first and last names
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
              />
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
              />
              OR
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
              />
              How many tickets?
              <Input
                value={tickets}
                onChange={(e) => setTickets(e.target.value)}
                placeholder="0"
              />
              <Button type="submit">Give tickets</Button>
            </form>
            {error && error}
            {success && <h3>Success!</h3>}
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

Tickets.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || !(profile.role == "admin" || profile.role == "superadmin")) {
    handleLoginRedirect(req);
  }

  return {
    profile,
  };
};

const ColoredText = styled.span`
  font-weight: 600;
  font-style: italic;
  padding: 2px;
  padding-right: 4px;
`;

const GoldColoredText = styled(ColoredText)`
  background-color: #ffe84c;
`;

const GreenColoredText = styled(ColoredText)`
  background-color: #90ee90;
`;

const RedColoredText = styled(ColoredText)`
  background-color: #ff9999;
`;

const OrangeColoredText = styled(ColoredText)`
  background-color: #ffc87c;
`;

const MaxHeightColumn = styled(Column)`
  padding: 1rem;
  min-width: 300px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const DevModeButton = styled(Button)`
  max-width: 120px;
  min-height: 3rem;
  margin: 0 0 0 auto;
  padding: 0;
  color: black;
  outline: none;
  background-color: #f6f6f6;

  &:hover {
    background-color: #ff8379 !important;
    color: white !important;
  }
`;

const PaddedBottomDiv = styled.div`
  padding: 0 0 2rem 0;
`;

const OnePaddedH1 = styled.h1`
  margin: auto 0;
  padding: 0 1rem 0 0;
`;

const TitleFlex = styled(Flex)`
  width: 100%;
  min-height: 3rem;
  margin: 0 0 1rem 0;
`;

const AdminCardContainer = styled(Flex)`
  width: 100%;
  flex: 1 1 auto;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  padding: 1rem;
  box-sizing: border-box;
  overflow-x: scroll;
`;

const CardContainer = styled.div`
  width: 100%;
  flex: 1 1 auto;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  padding: 32px;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const ScoreKeyLabel = styled(Button)`
  display: inline-block;
  padding: 10px 16px;
  margin-right: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  // color: ${({ theme }) => theme.colors.gray50};
`;

const Input = styled.input`
  border-radius: 8px;
  border: 1px solid #b2b2b2;
  padding: 12px 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default Tickets;

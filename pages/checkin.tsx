import React, { useRef, useState } from "react";
import styled from "styled-components";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Button,
  Background,
  Column,
  Flex,
  Container,
  Form,
  FormGroup
} from "../styles";

const Checkin = () => {
  const [firstNameInput, lastNameInput, emailInput] = [
    useRef(null),
    useRef(null),
    useRef(null)
  ];
  const [results, setResults] = useState([]);

  const lookupHackers = async e => {
    e.preventDefault();

    const firstName = firstNameInput.current.value;
    const lastName = lastNameInput.current.value;
    const email = emailInput.current.value;

    console.log({ firstName, lastName, email });
  };

  return (
    <>
      <Head title="HackSC Odyssey - Check in Hackers" />
      <Navbar loggedIn admin activePage="/" />
      <Background>
        <Container>
          <Flex direction="column">
            <h1>Checkin</h1>
            <Form>
              <Flex direction="row" justify="space-between">
                <Column flexBasis={49}>
                  <FormGroup>
                    <label>First Name</label>
                    <input type="text" ref={firstNameInput} />
                  </FormGroup>
                </Column>

                <Column flexBasis={49}>
                  <FormGroup>
                    <label>Last Name</label>
                    <input type="text" ref={lastNameInput} />
                  </FormGroup>
                </Column>
              </Flex>

              <FormGroup>
                <label>E-mail</label>
                <input type="email" ref={emailInput} />
              </FormGroup>

              <Button onClick={lookupHackers}>Look Up Hacker</Button>
            </Form>
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

Checkin.getInitialProps = async ctx => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || profile.role !== "admin") {
    handleLoginRedirect(req);
  }

  return {
    profile
  };
};

export default Checkin;

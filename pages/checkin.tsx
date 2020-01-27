import React, { useRef, useState, useMemo, useCallback } from "react";
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

const CheckinResult = ({ result, resetResults }) => {
  const qrInput = useRef(null);

  const handleAssignment = async e => {
    e.preventDefault();

    const qrInputValue = qrInput.current.value.trim().toUpperCase();

    if (qrInputValue === "") {
      return;
    }

    const confirmation = confirm(
      `Are you sure you want to assign this hacker QR ${qrInputValue}?`
    );

    if (confirmation) {
      console.log("send it");
      const assignRequest = await fetch("/api/live/assign-qr", {
        method: "POST",
        body: JSON.stringify({
          qrCodeId: qrInputValue,
          userId: result.userId
        }),
        headers: {
          "content-type": "application/json"
        }
      });

      if (assignRequest.status === 200) {
        alert("Successfully assigned hacker QR");
        resetResults();
      }
    }
  };

  return (
    <Result key={result.userId}>
      <h2>
        {result.firstName} {result.lastName}
      </h2>
      <p>
        <b>E-Mail: </b>
        {result.email}
      </p>
      <p>
        <b>School: </b>
        {result.school}
      </p>
      <p>
        <b>Gender: </b>
        {result.gender}
      </p>
      <p>
        <b>Ethnicity: </b>
        {result.ethnicity}
      </p>
      <p>
        <b>Status: </b>
        {result.status}
      </p>
      <p>
        <b>
          {result.qrCodeId === null
            ? "No QR code"
            : `Has a QR code (${result.qrCodeId})`}
        </b>
      </p>

      <br />

      {result.status === "confirmed" ? (
        <Flex direction="row" justify-content="space-between">
          <input type="text" maxLength={4} ref={qrInput}></input>
          <Button onClick={handleAssignment}>Assign QR</Button>
        </Flex>
      ) : (
        <p>
          <b>Hacker cannot be checked in. Status is not confirmed</b>
        </p>
      )}
    </Result>
  );
};

const Checkin = () => {
  const [firstNameInput, lastNameInput, emailInput] = [
    useRef(null),
    useRef(null),
    useRef(null)
  ];
  const [results, setResults] = useState([]);

  const resetResults = () => {
    setResults([]);
    firstNameInput.current.value = "";
    lastNameInput.current.value = "";
    emailInput.current.value = "";
  };

  const lookupHackers = async e => {
    e.preventDefault();

    const firstName = firstNameInput.current.value;
    const lastName = lastNameInput.current.value;
    const email = emailInput.current.value;

    const lookupReq = await fetch(
      `/api/live/lookup?firstName=${firstName}&lastName=${lastName}&email=${email}`
    );
    const { profiles } = await lookupReq.json();
    setResults(profiles);
  };

  const renderResults = useMemo(() => {
    return (
      <Results>
        {results.map(result => (
          <CheckinResult result={result} resetResults={resetResults} />
        ))}
      </Results>
    );
  }, [results]);

  return (
    <>
      <Head title="HackSC Odyssey - Check in Hackers" />
      <Navbar loggedIn admin activePage="/" />
      <Background>
        <Container>
          <Flex direction="column">
            <h1>Assign Hackers QR Codes for Check In</h1>
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

          {renderResults}
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

const Results = styled.div`
  padding: 18px 0;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Result = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 6px;
  margin-bottom: 12px;
  padding: 18px;
  box-sizing: border-box;

  input[type="text"] {
    border-radius: 8px;
    border: 1px solid #b2b2b2;
    padding: 12px 16px;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.black};
    font-size: 16px;
    flex-grow: 1;
    margin-right: 16px;
    text-transform: uppercase;
  }
`;

export default Checkin;

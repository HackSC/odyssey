import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Scanner from "../components/Scanner";

import { Background, Container, Form, Flex } from "../styles";
import Select from "../components/Select";

const Scan = ({ profile }) => {
  const [action, setAction] = useState(null);
  const [scannedCodes, setScannedCodes] = useState([]);
  const [successfulScan, setSuccessfulScan] = useState(null);

  const handleActionChange = e => {
    setAction(e.target.value);
  };

  const checkIfUserId = (code: string): boolean => {
    const GOOGLE_AUTH_PREFIX = "google-oauth2|";
    const AUTH0_PREFIX = "auth0|";

    return code.startsWith(GOOGLE_AUTH_PREFIX) || code.startsWith(AUTH0_PREFIX);
  };

  const sendScanRequest = async (code: string) => {
    if (!checkIfUserId(code)) {
      return;
    }

    const idRequest = await fetch(`/api/live/identity-check/${code}`);

    if (idRequest.status === 200) {
      // We successfully ID'd a user, show the first and last name to the scanner
      const idData = await idRequest.json();

      // Send a request to the server to scan hacker for task
      const scanRequest = await fetch("/api/live/dispatch", {
        method: "POST",
        body: JSON.stringify({
          userId: code,
          actionId: "checkin"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (scanRequest.status === 200) {
        // Successful scan, let's display that to the user
        setSuccessfulScan({
          firstName: idData.firstName,
          lastName: idData.lastName
        });
      }
    }
  };

  const handleScannedCode = useCallback(
    (code: string) => {
      setScannedCodes(prev => {
        if (!prev.includes(code)) {
          sendScanRequest(code);
          return [...prev, code];
        } else {
          return [...prev];
        }
      });
    },
    [scannedCodes]
  );

  return (
    <>
      <Head title="HackSC Odyssey - Scan" />
      <Container>
        <ScanTitle>Scan Codes</ScanTitle>

        <br />

        <h2>Select Action</h2>
        <Form>
          <Select
            name="shirt-size"
            options={[
              {
                label: "HackSC Check In",
                value: "initial-check-in"
              },
              {
                label: "React Workshop Attendance",
                value: "react-check-in"
              }
            ]}
            onChange={handleActionChange}
            required
          />

          <Flex direction="column">
            <ScanContainer>
              {!!action && (
                <Scanner
                  handleScannedCode={handleScannedCode}
                  successfulScan={successfulScan}
                />
              )}
            </ScanContainer>

            <HistoryContainer>
              {scannedCodes.map((code, index) => (
                <ScannedCode key={code + index}>{code}</ScannedCode>
              ))}
            </HistoryContainer>
          </Flex>
        </Form>
      </Container>
    </>
  );
};

Scan.getInitialProps = async ctx => {
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

const ScanTitle = styled.h1`
  padding-top: 32px;
`;

const ScanContainer = styled.div`
  flex-grow: 1;
  margin-top: 30px;
`;

const HistoryContainer = styled.div`
  margin-top: 16px;
`;

const ScannedCode = styled.p`
  padding-bottom: 15px;
  margin-bottom: 12px;
  border-bottom: 1px solid #ededed;
`;

export default Scan;

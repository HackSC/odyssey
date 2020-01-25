import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Scanner from "../components/Scanner";

import { Form } from "../styles";
import Select from "../components/Select";

const Scan = ({ profile }) => {
  const [action, setAction] = useState(null);
  const [scannedCodes, setScannedCodes] = useState([]);
  const [lastScan, setLastScan] = useState(null);

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
      const scanData = await scanRequest.json();
      // Successful scan, let's display that to the user
      setLastScan({
        message: scanData.profile.firstName + " " + scanData.profile.lastName,
        isSuccess: true
      });
    } else {
      const scanData = await scanRequest.json();
      // Invalid/unsuccessful scan, let's display that to the user
      setLastScan({
        message: scanData.err,
        isSuccess: false
      });
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
      <PageContainer>
        <ActionBar>
          <h1>Scan Codes</h1>

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
          </Form>
        </ActionBar>

        <ScanContainer>
          {!!action && (
            <Scanner
              handleScannedCode={handleScannedCode}
              lastScan={lastScan}
            />
          )}
        </ScanContainer>
      </PageContainer>
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

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100vw;
  height: 100vh;
`;

const ActionBar = styled.div`
  background: ${({ theme }) => theme.colors.gray5};
  padding: 24px;
`;

const ScanContainer = styled.div`
  flex-grow: 1;
  background: #1d1d1d;
`;

export default Scan;

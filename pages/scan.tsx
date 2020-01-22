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

  const handleActionChange = e => {
    setAction(e.target.value);
  };

  const sendScanRequest = async (code: string) => {
    await fetch("/api/scan", {
      method: "POST",
      body: JSON.stringify({
        code
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
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
      <Navbar loggedIn activePage="scan" admin />
      <Background>
        <Container>
          <h1>Scan Codes</h1>

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
              <ScanColumn>
                {!!action && <Scanner handleScannedCode={handleScannedCode} />}
              </ScanColumn>

              <HistoryColumn>
                {scannedCodes.map((code, index) => (
                  <ScannedCode key={code + index}>{code}</ScannedCode>
                ))}
              </HistoryColumn>
            </Flex>
          </Form>
        </Container>
      </Background>
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

const ScanColumn = styled.div`
  flex-grow: 1;
  margin-top: 30px;
`;

const HistoryColumn = styled.div`
  margin-top: 30px;
  padding-left: 30px;
`;

const ScannedCode = styled.p`
  padding-bottom: 15px;
  margin-bottom: 12px;
  border-bottom: 1px solid #ededed;
`;

export default Scan;

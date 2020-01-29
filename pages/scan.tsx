import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { useToasts } from "react-toast-notifications";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import Head from "../components/Head";
import Scanner from "../components/Scanner";

import { Form } from "../styles";
import Select from "../components/Select";

const Scan = ({ profile }) => {
  const [action, setAction] = useState(null);
  const [scannedCodes, setScannedCodes] = useState([]);

  // TOASTS
  const { addToast } = useToasts();

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
        actionId: action === "checkin" ? "checkin" : "contrib",
        taskId: action !== "checkin" ? action : null
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const scanData = await scanRequest.json();

    if (scanRequest.status === 200) {
      // Successful scan, let's display that to the user
      addToast(scanData.message, { appearance: "success", autoDismiss: true });
    } else {
      addToast(scanData.message, { appearance: "error", autoDismiss: true });
    }
  };

  const handleScannedCode = useCallback(
    (code: string) => {
      const codeWithAction = `${action} -- ${code}`;
      setScannedCodes(prev => {
        if (!prev.includes(codeWithAction)) {
          sendScanRequest(code);
          return [...prev, codeWithAction];
        } else {
          return [...prev];
        }
      });
    },
    [scannedCodes, action]
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
                  value: "checkin"
                },
                {
                  label: "React Workshop Attendance",
                  value: "1"
                }
              ]}
              onChange={handleActionChange}
              required
            />
          </Form>
        </ActionBar>

        <ScanContainer>
          {!!action && (
            <Scanner handleScannedCode={handleScannedCode} action={action} />
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
  height: 100%;
`;

const ActionBar = styled.div`
  background: ${({ theme }) => theme.colors.gray5};
  padding: 24px;
`;

const ScanContainer = styled.div`
  flex-grow: 1;
  background: #1d1d1d;
  display: flex;
  align-items: center;
`;

export default Scan;

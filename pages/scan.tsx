import React, { useState, useCallback, useRef, useMemo } from "react";
import styled from "styled-components";

import { useToasts } from "react-toast-notifications";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import Head from "../components/Head";
import Scanner from "../components/Scanner";

import { Button, Form, Flex } from "../styles";
import Select from "../components/Select";
import { getCurrentTasks } from "../lib/live";
import { liveDispatchFetch } from "../lib/api-sdk/liveHooks";

// TO-DO -- pull this out, define elsewhere
const ACTIONS = [
  {
    label: "HackSC Check In",
    value: "action checkin"
  }
];

const Scan = ({ profile, tasks }) => {
  const [action, setAction] = useState(null);
  const [lastScannedCode, setLastScannedCode] = useState(null);

  const manualInputRef = useRef(null);

  // TOASTS
  const { addToast } = useToasts();

  const handleActionChange = e => {
    setAction(e.target.value);
  };

  const checkIfValidCode = (code: string): boolean => {
    if (code.length === 4) {
      const uppercaseAlphanumericRegEx = /[A-Z,0-9]{4}/;
      return uppercaseAlphanumericRegEx.test(code);
    } else {
      return false;
    }
  };

  const sendScanRequest = async (code: string) => {
    if (!checkIfValidCode(code)) {
      return;
    }

    const dispatchBody = {
      qrCodeid: code
    };

    // Either an action (ex: checkin) or a task (ex: 1, 2, etc)
    const [typeOfAction, value] = action.split(" ");
    dispatchBody[typeOfAction === "action" ? "actionId" : "taskId"] = value;

    const scanResponse = await liveDispatchFetch(dispatchBody);

    if (!scanResponse.error) {
      // Successful scan, let's display that to the user
      addToast("Successfully scanned hacker's QR code", {
        appearance: "success",
        autoDismiss: true
      });
    } else {
      addToast(scanResponse.error, { appearance: "error", autoDismiss: true });
    }
  };

  const handleScannedCode = useCallback(
    (code: string) => {
      setLastScannedCode(prev => {
        if (prev !== code) {
          sendScanRequest(code);
          return code;
        } else {
          return prev;
        }
      });
    },
    [action]
  );

  const handleManualInput = e => {
    e.preventDefault();

    if (manualInputRef.current) {
      const inputValue = manualInputRef.current.value.trim().toUpperCase();

      if (checkIfValidCode(inputValue)) {
        handleScannedCode(inputValue);

        // Reset manual input form
        manualInputRef.current.value = "";
      }
    }
  };

  const tasksWithActionsOptions = useMemo(() => {
    const tasksAsSelectOptions = !!tasks
      ? tasks.map(task => ({
          value: `task ${task.id}`,
          label: task.name
        }))
      : [];

    // ACTIONS defined at top of scan.tsx -- will likely update later at some point
    return [...ACTIONS, ...tasksAsSelectOptions];
  }, [tasks]);

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
              options={tasksWithActionsOptions}
              onChange={handleActionChange}
              required
            />
          </Form>
        </ActionBar>

        <ScanContainer>
          {!!action ? (
            <>
              <Scanner handleScannedCode={handleScannedCode} action={action} />
              <ManualInputForm>
                <Flex direction="column">
                  <ManualInputLabel>Manual Input</ManualInputLabel>
                  <Flex direction="row">
                    <ManualInputText
                      type="text"
                      maxLength={4}
                      ref={manualInputRef}
                    />
                    <Button onClick={handleManualInput}>Submit</Button>
                  </Flex>
                  <ManualInputInstructions>
                    If a code cannot be scanned for some reason, manually input
                    a hacker's 4 letter code and click submit
                  </ManualInputInstructions>
                </Flex>
              </ManualInputForm>
            </>
          ) : (
            <SelectMessage>
              Please select an action to scan hackers
            </SelectMessage>
          )}
        </ScanContainer>
      </PageContainer>
    </>
  );
};

Scan.getInitialProps = async ctx => {
  const { req } = ctx;

  const profile = await getProfile(req);
  const tasks = await getCurrentTasks(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || profile.role !== "admin") {
    handleLoginRedirect(req);
  }

  return {
    profile,
    tasks: tasks.tasks // TODO -- update this once we've standardized our server/client stuff
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
  justify-content: center;
  flex-direction: column;
`;

const SelectMessage = styled.p`
  color: #ffffff;
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  padding: 18px;
  line-height: 28px;
`;

const ManualInputForm = styled(Form)`
  padding: 0 18px;
`;

const ManualInputLabel = styled.label`
  color: #ffffff;
  margin: 12px 0;
  font-weight: 700;
`;

const ManualInputText = styled.input`
  margin-right: 12px;
  text-transform: uppercase;
`;

const ManualInputInstructions = styled.p`
  font-size: 12px;
  color: #ffffff;
  margin-top: 12px;
`;

export default Scan;

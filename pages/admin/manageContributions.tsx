import React, {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import styled from "styled-components";
import { Detector } from "react-detect-offline";

import { useToasts } from "react-toast-notifications";

import {
  handleLoginRedirect,
  getProfile,
  sendSlackMessage,
  handleSponsorRedirect,
} from "../../lib";

import { Head, Scanner, Navbar, Select } from "../../components";

import { Button, Form, Flex, Background } from "../../styles";

import {
  liveDispatchFetch,
  liveEmailPointFetch,
} from "../../lib/api-sdk/liveHooks";
import { getAllTasksFetch } from "../../lib/api-sdk/taskHooks";
import { Container } from "next/app";

// TO-DO -- pull this out, define elsewhere
const ACTIONS = [
  {
    label: "HackSC Check In",
    value: "action checkin",
  },
  {
    label: "Identify Hacker",
    value: "action identify",
  },
  {
    label: "Check Points Total",
    value: "action points",
  },
  {
    label: "Confirm Project Submission",
    value: "action judge",
  },
];

type Props = {
  admin_profile: Profile;
  tasks: ActiveTask[];
};

const Scan = ({ admin_profile, tasks }: Props) => {
  const [action, setAction] = useState(ACTIONS[0].value);
  const [lastScannedCode, setLastScannedCode] = useState(null);
  const [online, setOnline] = useState(true);

  const manualInputRef = useRef(null);

  const { addToast } = useToasts();

  const handleActionChange = (e) => {
    setAction(e.target.value);
    setLastScannedCode(null);
  };

  const sendScanRequest = async (email: string) => {
    const dispatchBody = {
      email: email,
    };

    // Either an action (ex: checkin) or a task (ex: 1, 2, etc)
    const [typeOfAction, value] = action.split(" ");

    if (typeOfAction === "action") {
      dispatchBody["actionId"] = value;
    } else {
      dispatchBody["actionId"] = "contrib";
      dispatchBody["taskId"] = value;
    }

    // If we're checking prizes, we don't use dispatch
    if (dispatchBody["actionId"] === "points") {
      const pointResponse = await liveEmailPointFetch(email);

      if (!pointResponse.error) {
        if (
          pointResponse.success &&
          pointResponse.success[0] &&
          pointResponse.success[0].totalPoints
        ) {
          const pointTotal = pointResponse.success[0].totalPoints;
          addToast(`User has ${pointTotal} points`, {
            appearance: "info",
            autoDismiss: true,
          });
        } else {
          addToast(
            "Couldn't find point total... user might not have scanned for any tasks",
            {
              appearance: "error",
              autoDismiss: true,
            }
          );
        }
      } else {
        addToast(pointResponse.error, {
          appearance: "error",
          autoDismiss: true,
        });
      }

      return;
    }

    const scanResponse = await liveDispatchFetch(dispatchBody);

    if (!scanResponse.error) {
      // Successful scan, let's display that to the user
      if (dispatchBody["actionId"] === "checkin") {
        addToast("Successfully checked in user", {
          appearance: "success",
          autoDismiss: true,
        });
      } else if (dispatchBody["actionId"] === "identify") {
        const profile: Profile = scanResponse.success as Profile;
        addToast(
          `This code belongs to ${profile.firstName} ${profile.lastName} (${
            profile.email
          }) ${profile.isBattlepassComplete && " IS PREMIUM"}`,
          {
            appearance: "success",
            autoDismiss: true,
          }
        );
      } else if (dispatchBody["actionId"] === "contrib") {
        addToast("Hacker has been credited points for finishing task", {
          appearance: "success",
          autoDismiss: true,
        });
      } else if (dispatchBody["actionId"] === "judge") {
        const members: Array<Profile> = scanResponse.success as Array<Profile>;
        const memberNames = members.map((p) => {
          return p.firstName + " " + p.lastName;
        });
        addToast(
          `Submission has been successfully confirmed for ${memberNames.join(
            ", "
          )}`,
          {
            appearance: "success",
            autoDismiss: true,
          }
        );
      }
    } else {
      console.log(scanResponse);
      addToast(scanResponse.error, { appearance: "error", autoDismiss: true });
    }
  };

  const handleAction = useCallback(
    (email: string) => {
      setLastScannedCode((prev) => {
        if (prev !== email) {
          sendScanRequest(email);
          return email;
        } else {
          return prev;
        }
      });
    },
    [action]
  );

  const handleManualInput = (e) => {
    e.preventDefault();

    if (manualInputRef.current) {
      const inputValue = manualInputRef.current.value.trim();

      handleAction(inputValue);

      // Reset manual input form
      manualInputRef.current.value = "";
    }
  };

  const tasksWithActionsOptions = useMemo(() => {
    const tasksAsSelectOptions = !!tasks
      ? tasks.map((task) => ({
          value: `task ${task.id}`,
          label: task.name,
        }))
      : [];

    // ACTIONS defined at top of scan.tsx -- will likely update later at some point
    return [...ACTIONS, ...tasksAsSelectOptions];
  }, [tasks]);

  return (
    <>
      <Head title="HackSC Odyssey - Scan" />
      <Navbar
        loggedIn
        admin
        superadmin={admin_profile.role === "superadmin"}
        activePage="/scan"
      />
      <ScanBackground padding="4vh 0">
        <Container width={"96%"}>
          <ScanContainer>
            <ActionBar>
              <h1>Scan Codes</h1>
              <Form style={{ width: "100%" }}>
                <Select
                  name="shirt-size"
                  placeholder={"Select Action..."}
                  options={tasksWithActionsOptions}
                  onChange={handleActionChange}
                />
              </Form>
            </ActionBar>
            {!!action ? (
              <>
                <ManualInputForm>
                  <Flex direction="column">
                    <ManualInputLabel>Manual Input</ManualInputLabel>
                    <Flex direction="row" style={{ flexWrap: "wrap" }}>
                      <ManualInputText
                        type="text"
                        placeholder={"hacker email"}
                        maxLength={255}
                        ref={manualInputRef}
                      />
                      <Button
                        style={{ width: "200px" }}
                        onClick={handleManualInput}
                      >
                        Submit
                      </Button>
                    </Flex>
                    <ManualInputInstructions>
                      Please enter a hacker's email
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
        </Container>
      </ScanBackground>
    </>
  );
};

Scan.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // * Null profile means user is not logged in, and this is only relevant for admins and volunteers
  if (
    !profile ||
    (profile.role !== "admin" &&
      profile.role !== "volunteer" &&
      profile.role !== "judge" &&
      profile.role !== "superadmin")
  ) {
    if (profile && profile.role == "sponsor") handleSponsorRedirect(req);
    else handleLoginRedirect(req);
  }

  const { success: allTasks } = await getAllTasksFetch(req);
  const activeTasks = allTasks.filter((t) => t.isActive);

  return {
    admin_profile: profile,
    tasks: activeTasks, // TODO -- update this once we've standardized our server/client stuff
  };
};

const ScannerPadding = styled(Flex)`
  direction: row;
  padding: 1rem;
`;

const ScanBackground = styled(Background)`
  width: 100%;
  min-height: 80vh;
`;

const ActionBar = styled.div`
  margin: 1rem;
  width: 100%;
`;

const ScanContainer = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 0 2rem;
  max-width: 600px;
  margin: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SelectMessage = styled.p`
  font-size: 24px;
  font-weight: 800;
  text-align: center;
  padding: 18px;
  line-height: 28px;
`;

const ManualInputForm = styled(Form)`
  padding: 0;
  width: 100%;
`;

const ManualInputLabel = styled.label`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const ManualInputText = styled.input`
  margin-right: 12px;
`;

const ManualInputInstructions = styled.p`
  font-size: 12px;
  margin: 1rem;
`;

export default Scan;

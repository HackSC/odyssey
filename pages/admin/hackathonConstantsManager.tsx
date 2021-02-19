import React, { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

import { Head, Navbar, Footer } from "../../components";
import {
  handleLoginRedirect,
  getProfile,
  sendSlackMessage,
  getFullJudgeList,
  getHackathonConstants,
  updateHackathonConstant,
  deleteHackathonConstant,
  createHackathonConstant,
} from "../../lib";
import { createJudging } from "../../lib/judging";
import {
  Background,
  Container,
  EditButton,
  CreateButton,
  Task,
  TaskInfo,
} from "../../styles";

const EditableCell = ({
  addToast,
  updateCurrentConstants,
  constant,
  profile,
}) => {
  const [currConstant, setCurrConstant] = useState(constant);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <FlexJudge>
      <ConstantInfo>
        <input
          type="text"
          placeholder="name"
          value={currConstant.name}
          onChange={(e) => {
            setCurrConstant({ ...currConstant, name: e.target.value });
          }}
        />
        <input
          type="boolean"
          placeholder="boolean"
          value={currConstant.boolean}
          onChange={(e) => {
            setCurrConstant({ ...currConstant, boolean: e.target.value });
          }}
        />
        {Date.parse(currConstant.date) && (
          <input
            type="datetime-local"
            placeholder="date"
            style={{ width: "-webkit-fill-available" }}
            value={new Date(
              new Date(Date.parse(currConstant.date)).setHours(
                new Date(Date.parse(currConstant.date)).getHours() - 8
              )
            )
              .toISOString()
              .replace("Z", "")}
            onChange={(e) => {
              setCurrConstant({
                ...currConstant,
                date: e.target.value,
              });
            }}
          />
        )}
        <input
          type="text"
          placeholder="enter type"
          value={currConstant.type}
          style={{ width: "-webkit-fill-available" }}
          onChange={(e) => {
            setCurrConstant({ ...currConstant, type: e.target.value });
          }}
        />
      </ConstantInfo>
      {updating ? (
        <SyncLoader size={5} color={"#FF8379"} />
      ) : (
        <ConstantUpdate
          onClick={async () => {
            setUpdating(true);
            const result = await updateHackathonConstant(currConstant);
            if (result) {
              let firstName = profile ? profile.firstName : "";
              let lastName = profile ? profile.lastName : "";
              let user_email = profile ? profile.email : "";
              let start_and_end_date =
                new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
                "";
              let slack_result = await sendSlackMessage(
                ":hammer_and_wrench: Judging Event UPDATED (/admin/hackathonConstantsManager) by " +
                  firstName +
                  ", " +
                  lastName +
                  ", " +
                  user_email,
                "Constant Id: " +
                  currConstant.id +
                  "\nConstant Name: " +
                  currConstant.name +
                  "\nConstant Boolean: " +
                  currConstant.boolean +
                  "\nConstant Date: " +
                  currConstant.date +
                  "\nConstant Type: " +
                  currConstant.type,
                start_and_end_date,
                start_and_end_date
              );
              let update_constants = await getHackathonConstants();
              updateCurrentConstants(update_constants);
              addToast("Updated Hackathon Constant!", {
                appearance: "success",
              });
              //window.location.reload();
            } else {
              addToast("Error: Failed to update Hackathon Constant", {
                appearance: "error",
              });
            }
            setUpdating(false);
          }}
        >
          {" "}
          Update Constant{" "}
        </ConstantUpdate>
      )}
      {deleting ? (
        <SyncLoader
          size={5}
          color={"#FF8379"}
          css={"marin:0.5rem;padding:0.5rem;"}
        />
      ) : (
        <ConstantDelete
          onClick={async () => {
            setDeleting(true);
            const result = await deleteHackathonConstant(currConstant);
            if (result) {
              let firstName = profile ? profile.firstName : "";
              let lastName = profile ? profile.lastName : "";
              let user_email = profile ? profile.email : "";
              let start_and_end_date =
                new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
                "";
              let slack_result = await sendSlackMessage(
                ":red_circle: Hackathon Constant DELETED (/admin/HhckathonConstantsManager) by " +
                  firstName +
                  ", " +
                  lastName +
                  ", " +
                  user_email,
                "Constant Id: " +
                  currConstant.id +
                  "\nConstant Name: " +
                  currConstant.name +
                  "\nConstant Boolean: " +
                  currConstant.boolean +
                  "\nConstant Date: " +
                  currConstant.date +
                  "\nConstant Type: " +
                  currConstant.type,
                start_and_end_date,
                start_and_end_date
              );
              let update_constants = await getHackathonConstants();
              updateCurrentConstants(update_constants);
              addToast("Deleted Hackathon Constant!", {
                appearance: "success",
              });
            } else {
              addToast("Error: Failed to delete Hackathon Constant", {
                appearance: "error",
              });
            }
            setDeleting(false);
          }}
        >
          Delete Constant
        </ConstantDelete>
      )}
    </FlexJudge>
  );
};

const HackathonConstantsManager = ({ profile, hackathonConstants }) => {
  const [constantsList, setConstantsList] = useState(hackathonConstants);
  const [newConstant, setNewConstant] = useState({
    name: null,
    boolean: null,
    date: null,
    type: null,
  });

  const { addToast } = useToasts();

  const taskBlocks = constantsList.map((constant) => {
    return (
      <EditableCell
        addToast={addToast}
        key={Object.entries(constant).join()}
        updateCurrentConstants={(newConstants) =>
          setConstantsList(newConstants)
        }
        profile={profile}
        constant={constant}
      />
    );
  });
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar
        loggedIn
        admin
        superadmin={profile.role === "superadmin"}
        activePage="/HackathonConstantsManager"
      />
      <Background padding="2rem">
        <Container>
          <h1 style={{ margin: "1rem" }}>Manage Hackathon Constants</h1>
          <FlexJudge>
            <ConstantInfo>
              <input
                type="text"
                placeholder="enter constant name"
                onChange={(e) => {
                  setNewConstant({ ...newConstant, name: e.target.value });
                }}
              />
              <input
                type="text"
                placeholder="enter constant boolean"
                onChange={(e) => {
                  setNewConstant({ ...newConstant, boolean: e.target.value });
                }}
              />
              <input
                type="datetime-local"
                placeholder="enter new date"
                style={{ width: "-webkit-fill-available" }}
                onChange={(e) => {
                  setNewConstant({
                    ...newConstant,
                    date: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="enter type"
                style={{ width: "-webkit-fill-available" }}
                onChange={(e) => {
                  setNewConstant({
                    ...newConstant,
                    type: e.target.value,
                  });
                }}
              />
            </ConstantInfo>
            <ConstantCreate
              type="submit"
              value="Create New Constant"
              onClick={async () => {
                const result = await createHackathonConstant(newConstant);
                if (result) {
                  let firstName = profile ? profile.firstName : "";
                  let lastName = profile ? profile.lastName : "";
                  let user_email = profile ? profile.email : "";
                  let start_and_end_date =
                    new Date(
                      new Date().getTime() - 480 * 1000 * 60
                    ).toISOString() + "";
                  let slack_result = await sendSlackMessage(
                    ":white_check_mark: New Constant Created (/admin/hackathonConstantsManager) by " +
                      firstName +
                      ", " +
                      lastName +
                      ", " +
                      user_email,
                    "Constant Name: " +
                      newConstant.name +
                      "\nConstant Boolean: " +
                      newConstant.boolean +
                      "\nConstant Date: " +
                      newConstant.date +
                      "\nConstant Type: " +
                      newConstant.type,
                    start_and_end_date,
                    start_and_end_date
                  );
                  let updated_constants = await getHackathonConstants();
                  setConstantsList(updated_constants);
                  addToast("Created Hackathon Constant!", {
                    appearance: "success",
                  });
                  // In theory we do optimistic local state updating, in practice, fuck it it'll do
                } else {
                  addToast("Error: Failed to create Hackathon Constant", {
                    appearance: "error",
                  });
                }
              }}
            >
              Create New Constant
            </ConstantCreate>
          </FlexJudge>
          <div>{taskBlocks}</div>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

HackathonConstantsManager.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const hackathonConstants = await getHackathonConstants();

  // Null profile means user is not logged in
  if (!profile || profile.role !== "superadmin") {
    handleLoginRedirect(req);
  }

  return {
    profile,
    hackathonConstants,
  };
};

const FlexJudge = styled(Task)`
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ConstantInfo = styled(TaskInfo)`
  flex-basis: 70%;
  margin: 1rem auto;
`;

const ConstantCreate = styled(CreateButton)`
  flex-basis: 20%;
  min-width: 6rem;
  margin: auto;
`;

const ConstantUpdate = styled(EditButton)`
  flex-basis: 10%;
  min-width: 6rem;
  margin: auto;
`;

const ConstantDelete = styled(EditButton)`
  flex-basis: 10%;
  min-width: 6rem;
  margin: auto;
`;

export default HackathonConstantsManager;

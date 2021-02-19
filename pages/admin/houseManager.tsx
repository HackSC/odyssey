import React, { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useToasts } from "react-toast-notifications";

import { Head, Navbar, Footer } from "../../components";
import {
  getHouses,
  createHouse,
  updateHouse,
  deleteHouse,
  handleLoginRedirect,
  getProfile,
  sendSlackMessage,
} from "../../lib";
import {
  Background,
  Container,
  EditButton,
  Task,
  TaskInfo,
} from "../../styles";

const EditableCell = ({ addToast, updateCurrentHouses, profile, house }) => {
  const [currHouse, setCurrHouse] = useState(house);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <Task>
      <TaskInfo>
        <input
          type="text"
          placeholder="name"
          value={currHouse.name}
          onChange={(e) => {
            setCurrHouse({ ...currHouse, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="color"
          value={currHouse.color}
          onChange={(e) => {
            setCurrHouse({ ...currHouse, type: e.target.value });
          }}
        />
      </TaskInfo>
      {updating ? (
        <SyncLoader size={5} color={"#FF8379"} />
      ) : (
        <EditButton
          onClick={async () => {
            setUpdating(true);
            const result = await updateHouse(currHouse);
            if (result) {
              let firstName = profile ? profile.firstName : "";
              let lastName = profile ? profile.lastName : "";
              let user_email = profile ? profile.email : "";
              let start_and_end_date =
                new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
                "";
              let slack_result = await sendSlackMessage(
                ":hammer_and_wrench: House UPDATED (/admin/houseManager) by " +
                  firstName +
                  ", " +
                  lastName +
                  ", " +
                  user_email,
                "House Name: " +
                  currHouse.name +
                  "\nHouse Color: " +
                  currHouse.color,
                start_and_end_date,
                start_and_end_date
              );
              let updated_houses = await getHouses(null);
              updateCurrentHouses(updated_houses);
              addToast("Updated House!", { appearance: "success" });
              //window.location.reload();
            } else {
              addToast("Error: Failed to update house", {
                appearance: "error",
              });
            }
            setUpdating(false);
          }}
        >
          {" "}
          Update House{" "}
        </EditButton>
      )}
      {deleting ? (
        <SyncLoader
          size={5}
          color={"#FF8379"}
          css={"marin:0.5rem;padding:0.5rem;"}
        />
      ) : (
        <EditButton
          onClick={async () => {
            setDeleting(true);
            const result = await deleteHouse(currHouse);
            if (result) {
              let firstName = profile ? profile.firstName : "";
              let lastName = profile ? profile.lastName : "";
              let user_email = profile ? profile.email : "";
              let start_and_end_date =
                new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
                "";
              let slack_result = await sendSlackMessage(
                ":red_circle: House DELETED (/admin/houseManager) by " +
                  firstName +
                  ", " +
                  lastName +
                  ", " +
                  user_email,
                "House Name: " +
                  currHouse.name +
                  "\nHouse Color: " +
                  currHouse.color,
                start_and_end_date,
                start_and_end_date
              );
              let updated_houses = await getHouses(null);
              updateCurrentHouses(updated_houses);
              addToast("Deleted House!", { appearance: "success" });
              window.location.reload();
            } else {
              addToast("Error: Failed to delete house", {
                appearance: "error",
              });
            }
            setDeleting(false);
          }}
        >
          Delete House
        </EditButton>
      )}
    </Task>
  );
};

const houseManager = ({ profile, currentHouses }) => {
  const [newHouse, setNewHouse] = useState({ name: null, color: null });

  const { addToast } = useToasts();

  const taskBlocks = currentHouses.houses.map((house) => {
    return (
      <EditableCell
        addToast={addToast}
        key={Object.entries(house).join()}
        updateCurrentHouses={(newHouses) => (currentHouses = newHouses)}
        profile={profile}
        house={house}
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
        activePage="/houseManager"
      />
      <Background padding="2rem">
        <Container>
          <h1 style={{ margin: "1rem" }}>Manage Houses</h1>
          <Task>
            <TaskInfo>
              <input
                type="text"
                placeholder="name"
                onChange={(e) => {
                  setNewHouse({
                    ...newHouse,
                    name: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="color ex: #123456"
                onChange={(e) => {
                  setNewHouse({
                    ...newHouse,
                    color: e.target.value,
                  });
                }}
              />
            </TaskInfo>
            <input
              type="submit"
              value="Create new House"
              onClick={async () => {
                const result = await createHouse(newHouse);
                if (result) {
                  let firstName = profile ? profile.firstName : "";
                  let lastName = profile ? profile.lastName : "";
                  let user_email = profile ? profile.email : "";
                  let start_and_end_date =
                    new Date(
                      new Date().getTime() - 480 * 1000 * 60
                    ).toISOString() + "";
                  let slack_result = await sendSlackMessage(
                    ":white_check_mark: New House Created (/admin/houseManager) by " +
                      firstName +
                      ", " +
                      lastName +
                      ", " +
                      user_email,
                    "House Name: " +
                      newHouse.name +
                      "\nHouse Color: " +
                      newHouse.color,
                    start_and_end_date,
                    start_and_end_date
                  );
                  addToast("Created House!", { appearance: "success" });
                  // In theory we do optimistic local state updating, in practice, fuck it it'll do
                  window.location.reload();
                } else {
                  addToast("Error: Failed to create house", {
                    appearance: "error",
                  });
                }
              }}
            />
          </Task>
          <div>{taskBlocks}</div>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

houseManager.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const currentHouses = await getHouses(req);

  // Null profile means user is not logged in
  if (!profile || !(profile.role == "admin" || profile.role == "superadmin")) {
    handleLoginRedirect(req);
  }

  return {
    profile,
    currentHouses,
  };
};

export default houseManager;
